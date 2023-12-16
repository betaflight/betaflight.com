# OSD & CMS Adjusting Screen

### Adjusting CMS Screen

Different display devices have different characteristics, so you may be experiencing inconvenience such as displayed items truncated at the right edge, top most line is only displayed lower half, and so on.

There are CLI variables that you can tweak to fit the content inside your screen.

#### MAX/AB7456 based FC-integrated (SPI-connected) OSD specific

`vcd_v_offset`
Adjust the vertical position of the first row.

`vcd_h_offset`
Adjust the horizontal position of the left edge.

`displayport_max7456_col_adjust`
Adjust number of characters in a line.

`displayport_max7456_row_adjust`
Adjust number of rows on the screen.

#### External OSD (DISPLAYPORT capable MWOSD and others)

`displayport_msp_col_adjust`
Adjust number of characters in a line.

`displayport_msp_row_adjust`
Adjust number of rows on the screen.

#### Example

![MAX7456 Before](https://cloud.githubusercontent.com/assets/14850998/21984495/9068762e-dc39-11e6-94e5-fde94f0a47d2.jpg)
Original Screen

![Adjusted Screen](https://cloud.githubusercontent.com/assets/14850998/21984498/9237de54-dc39-11e6-9ee5-94fa6bab2d07.jpg)
Screen with `displayport_max7456_col_adjust = -2`
