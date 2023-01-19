FrSky OSD
=========

- Vector based drawing with access to individual pixels.
- No implicit drawing by itself, all drawing commands must be issued by the host.
- Command based interface.


# Drawing system

## Main canvas

The OSD exposes a vector API on top of a fixed size canvas. Hosts shouldn't
make assumptions about the canvas size and instead query the OSD for it using
the `OSD_CMD_INFO` command. Point `(0, 0)` corresponds to the top left of the
canvas, with `X` coordinates increasing downwards and `Y` coordinates increasing
to the right.

![Coordinates](images/coordinates.png "OSD Coordinates")


## Current Transformation Matrix

The drawing system allows arbitrary affine transformations by implementing a
3x3 Current Transformation Matrix. This matrix can be used to e.g. rotate
and/or scale any lines or shapes drawn into the canvas. The API provides
several helper functions for easily manipulating the matrix.

## Context stack

Sometimes it can be useful to change the state of the drawing system to render some
shapes and then restore it to its previous state. This is accomplished via a context
stack. The graphics context stores the following information.

- Current transformation matrix
- Color Inversion
- Stroke color
- Stroke width
- Fill color
- Outline type
- Outline color
- Cursor position
- Clipping rect

Contexts can be pushed and popped with `OSD_CMD_CONTEXT_PUSH` and
`OSD_CMD_CONTEXT_POP`, respectivelly.

## Transactions

To minimize flickering, the OSD uses a multiple buffered drawing pipeline. This
allows seamlessly drawing complex shapes without displaying partial results on
the screen. Additionally, profiled transactions can be used to measure the
performance of the drawing code. If no transactions are used, drawing is
performed directly on the output buffer.

# API

## Command structure

All commands must have at least one byte. This first byte indicates the command
identifier, while the rest are totally dependent on each command.

Most command have fixed sized payloads. Commands with variable sizes explicitely
include the size for variable parts (e.g. commands for drawing strings).

## Responses and errors

Generally, commands don't generate a response. The few ones that do are explicitely
documented to do so. The response to a command `C` will be returned with its same
command identifier.

Errors are reported using the special `0` command followed by the command identifier
that generated the error and an error code, both as `uint8_t`.

## UART API

The OSD exposes its API over uart, using an `115200/8-N-1` configuration. Over UART,
each frame consists of the following:

- Header: `$A` (2 bytes)
- Frame length: `uvarint_t` representing the number of bytes that follow after this value
- Any number of commands
- A CRC8 using the `0xD5` polynomial and with the initial value `0` (also known as DVB-S2)
  covering everything but the header

## Types

### uint8_t
An unsigned byte in the `[0, 2^8 - 1]` interval.

### uint16_t
An unsigned short using little endian representation in the `[0, 2^16 - 1]` interval.

### float32
An IEEE 754 32 bit floating point using little endian representation.

### osd_point_t
A point with 12 bit signed `X` and `Y` coordinates, both in the
`[-2^11, 2^11 - 1]` range. It can be represented by the C type:

```
struct osd_point_t {
    int x: 12;
    int y: 12;
} __attribute__((packed));
```

### osd_size_t 
A size with 12 bit signed `width` and `height` fields, both in the
`[-2^11, 2^11 - 1]` range. It can be represented by the C type:

```
struct osd_size_t {
    int width: 12;
    int height: 12;
} __attribute__((packed));
```
Note that this type is binary equivalent to `osd_point_t`.

### osd_rect_t
A rectangle with an origin of type `osd_point_t` and a size of type
`osd_size_t`. It can be represented by the C type:

```
struct osd_rect_t {
    osd_point_t point;
    osd_size_t size;
} __attribute__((packed));
```

### osd_chr_data_t
The visible data and metadata for for a 12x18 2bpp character. Visible data consists
of 54 bytes while metadata takes 10 bytes, for a total of 64 bytes. It can be
represented by the C type:

```
struct osd_chr_data_t {
    uint8_t data[54];
    uint8_t metadata[10];
}
```

### color_t (uint8_t)
Available colors for drawing.

Values:
- `COLOR_BLACK` = 0
- `COLOR_TRANSPARENT` = 1
- `COLOR_WHITE` = 2
- `COLOR_GRAY` = 3

### outline_t (uint8_t)
Available types of outlines.

Values:
- `OUTLINE_TYPE_NONE` = 0
- `OUTLINE_TYPE_TOP` = 1 << 0
- `OUTLINE_TYPE_RIGHT` = 1 << 1
- `OUTLINE_TYPE_BOTTOM` = 1 << 2
- `OUTLINE_TYPE_LEFT` = 1 << 3

### uvarint_t
Unsigned integer encoded using variable length. The value is encoded in
little endian order with 7 bits per byte. The final byte must have its MSB
clear (i.e. value < 128), while intermediate bytes must have it set
(i.e. value >= 128).

The following C functions can be used to encode and decode an uvarint_t.

```
// Returns the number of bytes used
static inline int osd_cmd_encode_uvarint(uint8_t *ptr, size_t size, uint32_t val)
{
    unsigned ii = 0;
    while (val > 0x80)
    {
        if (ii >= size)
        {
            return -1;
        }
        ptr[ii] = (val & 0xFF) | 0x80;
        val >>= 7;
        ii++;
    }
    if (ii >= size)
    {
        return -1;
    }
    ptr[ii] = val & 0xFF;
    return ii + 1;
}

// Returns the number of bytes used, or < 0 if value can't be decoded
// into an uint32_t
static inline int osd_cmd_decode_uvarint(uint32_t *val, const uint8_t *ptr, size_t size)
{
    unsigned s = 0;
    *val = 0;
    for (size_t ii = 0; ii < size; ii++)
    {
        uint8_t b = ptr[ii];
        if (b < 0x80)
        {
            if (ii > 5 || (ii == 5 && b > 1))
            {
                // uint32_t overflow
                return -2;
            }
            *val |= ((uint32_t)b) << s;
            return ii + 1;
        }
        *val |= ((uint32_t)(b & 0x7f)) << s;
        s += 7;
    }
    // no value could be decoded and we have no data left
    return -1;
}
```

## Available commands

### OSD_CMD_INFO = 1
Returns information about the hardware capabilities. Note that some fields like the
viewport/grid size can change at runtime depending on the format used for the camera
input.

Arguments:
- `max_version` **uint8_t** Maximum protocol version understood by the host. Set to 1.

Returns:

- `magic` **uint8_t[3]** `A`, `G`, `H`
- `version_major` **uint8_t**
- `version_minor` **uint8_t**
- `version_patch` **uint8_t**
- `grid_rows` **uint8_t**
- `grid_colums` **uint8_t**
- `pixels_width` **uint16_t**
- `pixels_height` **uint16_t**
- `tv_standard` **uint8_t**
- `has_detected_camera` **uint8_t**
- `max_frame_size` **uint16_t**
- `context_stack_size` **uint8_t**

### OSD_CMD_READ_FONT = 2
Reads a font character from the non volatile memory.

Arguments:
- `chr` **uint16_t**

Returns:
- `chr` **uint16_t**
- `data` **osd_chr_data_t**

### OSD_CMD_WRITE_FONT = 3
Writes a font character into the non volatile memory.

**Notes:**
- When using the UART API, this command must be sent on
  its own frame.
- For compatibility with MAX7456 fonts, this command accepts
  omitting the metadata field in the `osd_chr_data_t` argument.

Arguments:
- `chr` **uint16_t**
- `data` **osd_chr_data_t**

Returns:
- `chr` **uint16_t**
- `data` **osd_chr_data_t**

### OSD_CMD_GET_CAMERA = 4
Returns the selected camera.

Returns:
- `camera` **uint8_t** (`= 0` automatic, `> 0` the n-th camera is selected)
  
### OSD_CMD_SET_CAMERA = 5
Sets the selected camera.

Arguments:
- `camera` **uint8_t** (`= 0` automatic, `> 0` select the n-th camera)

### OSD_CMD_GET_ACTIVE_CAMERA = 6
Returns the active camera. If a camera is manually selected, this will return
the same value as `OSD_CMD_GET_CAMERA`. When automatic camera selection is
enabled, it will return the camera with the lowest index that is providing
a valid video signal.

Returns:
- `camera` **uint8_t**

### OSD_CMD_GET_OSD_ENABLED = 7
Returns wether drawing on top of the video is enabled or disabled:

Returns:
- `enabled` **uint8_t**

### OSD_CMD_SET_OSD_ENABLED = 8
Enables or disables drawing on top of the video.

Arguments:
- `enabled` **uint8_t**

### OSD_CMD_TRANSACTION_BEGIN = 16
Begins a new transaction.

### OSD_CMD_TRANSACTION_COMMIT = 17
Commits an existing transaction. If no transaction is active, the command is ignored.

### OSD_CMD_TRANSACTION_BEGIN_PROFILED = 18
Starts a transaction that keeps track of how many instructions it used during its
drawing operations. When the transaction is commited, this number is draw to the
screen at the given point.

Arguments
- `point` **osd_point_t**

### OSD_CMD_TRANSACTION_BEGIN_RESET_DRAWING = 19
Equivalent to `OSD_CMD_TRANSACTION_BEGIN` followed by `OSD_CMD_DRAWING_RESET`.

### OSD_CMD_DRAWING_SET_STROKE_COLOR = 22
Sets the stroke color.

Arguments:
- `color` **color_t**

### OSD_CMD_DRAWING_SET_FILL_COLOR = 23
Sets the fill color.

Arguments:
- `color` **color_t**

### OSD_CMD_DRAWING_SET_STROKE_AND_FILL_COLOR = 24
Sets both the stroke and fill colors.

Arguments:
- `color` **color_t**

### OSD_CMD_DRAWING_SET_COLOR_INVERSION = 25
Sets wether the OSD should draw with black and white colors inverted, without
affecting the stroke nor fill colors. This applies to bitmaps and fonts too.

Arguments:
- `enable` **uint8_t**

### OSD_CMD_DRAWING_SET_PIXEL = 26
Sets a pixel to the given color.

Arguments:
- `point` **osd_point_t**
- `color` **color_t**

### OSD_CMD_DRAWING_SET_PIXEL_TO_STROKE_COLOR = 27
Sets a pixel to the stroke color.

Arguments:
- `point` **osd_point_t**

### OSD_CMD_DRAWING_SET_PIXEL_TO_FILL_COLOR = 28
Sets a pixel to the fill color.

Arguments:
- `point` **osd_point_t**

### OSD_CMD_DRAWING_SET_STROKE_WIDTH = 29
Sets the line width for stroked lines.

Arguments
- `width` **uint8_t**

### OSD_CMD_DRAWING_SET_LINE_OUTLINE_TYPE = 30
Sets the line outline edges. Note that this only affects lines drawn with
`OSD_CMD_DRAWING_STROKE_LINE_TO_POINT`.

Arguments
- `type` **outline_t**

### OSD_CMD_DRAWING_SET_LINE_OUTLINE_COLOR = 31
Sets the outline color

Arguments:
- `color` **color_t**

### OSD_CMD_DRAWING_CLIP_TO_RECT = 40
Restricts drawing to the area determined by the given rect. Note that this
rect is always in natural screen coordinates (i.e. not affected by the CTM).

Arguments:
- `rect`: **osd_rect_t**

### OSD_CMD_DRAWING_CLEAR_SCREEN = 41
Erases the whole screen.

### OSD_CMD_DRAWING_CLEAR_RECT = 42
Erases the given rect given in natural screen coordinates and bypassing the CTM.
This is intended as a very fast method to erase a section of the screen. For
erasing a shape transformed by the CTM just set the fill color to transparent
and fill it.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_RESET = 43
Resets the drawing state, popping all the context in the stack, removing the clipping
rect, setting stroke and fill colors to its default values, disables
color inversion, and resets the `CTM` to the identity matrix.

### OSD_CMD_DRAWING_DRAW_BITMAP = 44
Draws a 2bpp bitmap of the given size at the given point.

Arguments:
- `point` **osd_point_t**
- `size` **osd_size_t**
- `opts` **bitmap_opts_t**
- `bitmap_size` **uvarint_t**
- `bitmap` **const uint8_t[]** Bitmap data

### OSD_CMD_DRAWING_DRAW_BITMAP_MASK = 45
Draws a 2bpp bitmap of the given size at the given point as a transparency
mask using the provided color.

Arguments:
- `point` **osd_point_t**
- `size` **osd_size_t**
- `opts` **bitmap_opts_t**
- `color` **color_t**
- `bitmap_size` **uvarint_t**
- `bitmap` **const uint8_t[]** Bitmap data

### OSD_CMD_DRAWING_DRAW_CHAR = 46
Draws a character at the given point.

Arguments:
- `point` **osd_point_t**
- `chr` **uint16_t**
- `opts` **bitmap_opts_t**

### OSD_CMD_DRAWING_DRAW_CHAR_MASK = 47
Draws a character as a transparency mask at the given point using
the provided color.

Arguments:
- `point` **osd_point_t**
- `chr` **uint16_t**
- `opts` **bitmap_opts_t**
- `color` **color_t**

### OSD_CMD_DRAWING_DRAW_STRING = 48
Draws a string at the given point.

Arguments:
- `point` **osd_point_t**
- `opts` **bitmap_opts_t**
- `str_size` **uvarint_t**
- `str` **const char[]** NULL terminated C string

### OSD_CMD_DRAWING_DRAW_STRING_MASK = 49
Draws a string as a transparency mask at the given point using the
provided color.

Arguments:
- `point` **osd_point_t**
- `opts` **bitmap_opts_t**
- `color` **color_t**
- `str_size` **uvarint_t**
- `str` **const char[]** NULL terminated C string

### OSD_CMD_DRAWING_MOVE_TO_POINT = 50
Moves the cursor to the given point.

Arguments:
- `point` **osd_point_t**

### OSD_CMD_DRAWING_STROKE_LINE_TO_POINT = 51
Draws a line using the stroke color from the cursor to the given point. It
also moves the cursor to the given point after performing the draw operation.

Arguments:
- `point` **osd_point_t**

### OSD_CMD_DRAWING_STROKE_TRIANGLE = 52
Strokes a triangle determined by the given 3 points using the stroke color.

Arguments:
- `point1` **osd_point_t**
- `point2` **osd_point_t**
- `point3` **osd_point_t**

### OSD_CMD_DRAWING_FILL_TRIANGLE = 53
Fills a triangle determined by the given 3 points using the fill color.

Arguments:
- `point1` **osd_point_t**
- `point2` **osd_point_t**
- `point3` **osd_point_t**

### OSD_CMD_DRAWING_FILL_STROKE_TRIANGLE = 54
Fills a triangle determined by the given 3 points using the fill color, then
strokes it using the stroke color.

Arguments:
- `point1` **osd_point_t**
- `point2` **osd_point_t**
- `point3` **osd_point_t**

### OSD_CMD_DRAWING_STROKE_RECT = 55
Strokes a rectangle determined by the given argument using the stroke color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_FILL_RECT = 56
Fills a rectangle determined by the given argument using the fill color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_FILL_STROKE_RECT = 57
Fills a rectangle determined by the given argument using the fill color,
then strokes it using the stroke color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_STROKE_ELLIPSE_IN_RECT = 58
Strokes an ellipse that fits inside the specified rectable using the stroke
color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_FILL_ELLIPSE_IN_RECT = 59
Fills an ellipse that fits inside the specified rectable using the fill
color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_DRAWING_FILL_STROKE_ELLIPSE_IN_RECT = 60
Fills an ellipse that fits inside the specified rectable using the fill
color, the strokes it using the stroke color.

Arguments:
- `rect` **osd_rect_t**

### OSD_CMD_CTM_RESET = 80
Resets the `CTM` to the identity matrix.

### OSD_CMD_CTM_SET = 81
Sets the coefficients of the `CTM` directly.

Arguments:
- `m11` **float32**
- `m12` **float32**
- `m21` **float32**
- `m22` **float32**
- `m31` **float32**
- `m32` **float32**

### OSD_CMD_CTM_TRANSLATE = 82
Translates the `CTM` in both `X`and `Y` axes by the given `Tx` and `Ty` parameters.

Arguments:

- `Tx` **float32**
- `Ty` **float32**

### OSD_CMD_CTM_SCALE = 83
Scales the `CTM` in both `X` and `Y` axes by the given `Sx` and `Sy` parameters.

Arguments:

- `Sx` **float32**
- `Sy` **float32**

### OSD_CMD_CTM_ROTATE = 84
Rotates the `CTM` about `(0, 0)` by the given `angle` in radians. Positive
rotations are counter-clockwise.

Arguments:

- `angle` **float32**

### OSD_CMD_CTM_ROTATE_ABOUT = 85
Rotates the `CTM` about `(cx, cy)` by the given `angle` in radians. Positive
rotations are counter-clockwise.

Arguments:

- `angle` **float32**
- `cx` **float32**
- `cy` **float32**

### OSD_CMD_CTM_SHEAR = 86
Applies a shear transformation to the `CTM` about `(0, 0)` using the sx and
sy coefficients for the X and Y axes, respectively.

Arguments:

- `sx` **float32**
- `sy` **float32**

### OSD_CMD_CTM_SHEAR_ABOUT = 87
Applies a shear transformation to the `CTM` about `(cx, cy)` using the sx and
sy coefficients for the X and Y axes, respectively.

Arguments:

- `sx` **float32**
- `sy` **float32**
- `cx` **float32**
- `cy` **float32**

### OSD_CMD_CTM_MULTIPLY = 88
Multiplies the current `CTM` by the given matrix 3x3 matrix. Note that only the
`m11`, `m12`, `m21`, `m22`, `m31` and `m31` elements are provided as arguments,
since the `CTM`'s last column is always `{0 0 1}`.

Arguments:

- `m11` **float32**
- `m12` **float32**
- `m21` **float32**
- `m22` **float32**
- `m31` **float32**
- `m32` **float32**

### OSD_CMD_CONTEXT_PUSH = 100
Pushes a copy of the current context onto the stack and selects it as the
current context.

### OSD_CMD_CONTEXT_POP = 101
Pops the context at the top of the stack, selecting the next one as the
current context. If the stack only has one context, it does nothing.

### OSD_CMD_DRAW_GRID_CHR = 110
Draws a character aligned with the grid, erasing the grid slot first.

Arguments:
- `column` **uint8_t**
- `row` **uint8_t**
- `chr` **uint16_t**
- `opts` **bitmap_opts_t**

### OSD_CMD_DRAW_GRID_STR = 111
Draws a null terminated string aligned with the grid, erasing the affected
grid slots first.

Arguments:
- `column` **uint8_t**
- `row` **uint8_t**
- `opts` **bitmap_opts_t**
- `str_size` **uvarint_t**
- `str` **const char *** NULL terminated C string

### OSD_CMD_REBOOT = 120
Reboots the OSD

Arguments:
- `to_bootloader` **uint8_t** Values > 0 cause the OSD to reboot and wait for
  an update in bootloader mode

### OSD_CMD_WRITE_FLASH = 121
Used by the bootloader to provide firmware upgrades. 

### OSD_CMD_SET_DATA_RATE = 122
Changes the data rate to the OSD. When using the UART API, the
argument indicates the new `bps`. The change of speed is performed
after the response to this command has been sent to the host.

Arguments:
- `data_rate` **uint32_t** Requested data rate

Returns:
- `new_data_rate` **uint32_t** New data rate set. Might be different than the requested
