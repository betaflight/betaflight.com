package main // import "osdimages"

import (
	"flag"
	"fmt"
	"image/color"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/fogleman/gg"
	"github.com/golang/freetype/truetype"
	"golang.org/x/image/font/gofont/goregular"
)

const (
	osdViewPortWidth  = 30
	osdViewPortHeight = 28

	osdPixelSize = 10

	osdMarginPixels = 50

	ctxWidth  = osdMarginPixels*2 + osdViewPortWidth*osdPixelSize
	ctxHeight = osdMarginPixels*2 + osdViewPortHeight*osdPixelSize

	demoRectWidth  = 10 * osdPixelSize
	demoRectHeight = 6 * osdPixelSize
)

func setFont(ctx *gg.Context, size float64) {
	font, err := truetype.Parse(goregular.TTF)
	if err != nil {
		panic(err)
	}

	face := truetype.NewFace(font, &truetype.Options{Size: size})
	ctx.SetFontFace(face)
}

func drawBackground(ctx *gg.Context) {
	ctx.SetColor(color.Gray{
		180,
	})
	ctx.DrawRectangle(0, 0, float64(ctx.Width()-1), float64(ctx.Height()-1))
	ctx.Fill()
}

func drawGrid(ctx *gg.Context) {
	ctx.SetColor(color.Black)
	ctx.SetLineWidth(1)
	x := float64(osdMarginPixels)
	xs := float64(osdMarginPixels)
	xe := float64(ctx.Height() - 1 - osdMarginPixels)
	for ii := 0; ii <= osdViewPortWidth; ii++ {
		ctx.DrawLine(x, xs, x, xe)
		x += osdPixelSize
	}
	y := float64(osdMarginPixels)
	ys := float64(osdMarginPixels)
	ye := float64(ctx.Width() - 1 - osdMarginPixels)
	for ii := 0; ii <= osdViewPortHeight; ii++ {
		ctx.DrawLine(ys, y, ye, y)
		y += osdPixelSize
	}
	ctx.Stroke()
}

func drawCoordinates(ctx *gg.Context) {
	ctx.SetColor(color.RGBA{255, 0, 0, 255})
	ctx.DrawPoint(osdMarginPixels, osdMarginPixels, osdPixelSize/2)
	ctx.Fill()

	ctx.SetColor(color.RGBA{0, 0, 255, 255})
	ctx.DrawPoint(ctxWidth-osdMarginPixels, ctxHeight-osdMarginPixels, osdPixelSize/2)
	ctx.Fill()

	setFont(ctx, 12)
	ctx.SetColor(color.Black)
	ctx.DrawStringAnchored("(0, 0)", osdMarginPixels, osdMarginPixels, 0.5, -0.7)
	ctx.DrawStringAnchored("(W - 1, H - 1)", ctxWidth-osdMarginPixels, ctxHeight-osdMarginPixels, 0.5, 1.2)
}

func drawRectWithRotation(ctx *gg.Context, r float64) {
	ctx.SetColor(color.RGBA{0, 255, 0, 255})
	w := float64(demoRectWidth)
	h := float64(demoRectHeight)
	//	ctx.RotateAbout(r, ctxWidth/2, ctxHeight/2)
	ctx.ShearAbout(r*5, r*5, ctxWidth/2, ctxHeight/2)
	ctx.DrawRectangle(ctxWidth/2-w/2, ctxHeight/2-h/2, w, h)
	ctx.Fill()

	ctx.SetColor(color.RGBA{255, 255, 0, 255})
	setFont(ctx, 20)
	cx := float64(ctxWidth / 2)
	cy := float64(ctxHeight / 2)
	ctx.DrawPoint(cx-demoRectWidth/2, cy-demoRectHeight/2, osdPixelSize/2)
	ctx.DrawStringAnchored("(Rx, Ry)", cx-demoRectWidth/2, cy-demoRectHeight/2, 0.5, -0.7)
	ctx.Fill()

	ctx.SetColor(color.RGBA{0, 0, 255, 255})
	ctx.DrawPoint(cx+demoRectWidth/2, cy+demoRectHeight/2, osdPixelSize/2)
	ctx.DrawStringAnchored("(Rx + Rw, Ry + Rh)", cx+demoRectWidth/2, cy+demoRectHeight/2, 0.5, 1.7)
	ctx.Fill()
}

func drawRectRotated(ctx *gg.Context) {
	drawRectWithRotation(ctx, gg.Radians(30))
}

func drawRect(ctx *gg.Context) {
	drawRectWithRotation(ctx, 0)
}

func newContext() *gg.Context {
	ctx := gg.NewContext(ctxWidth, ctxHeight)
	drawBackground(ctx)
	drawGrid(ctx)
	return ctx
}

func saveContext(ctx *gg.Context, output string) error {
	var w io.Writer
	var f *os.File
	var err error
	if output != "" {
		f, err = os.Create(output)
		if err != nil {
			return err
		}
		defer f.Close()
		w = f
	} else {
		w = os.Stdout
	}

	if err := ctx.EncodePNG(w); err != nil {
		return err
	}

	if f != nil {
		if err := f.Close(); err != nil {
			return err
		}
	}
	return nil
}

func main() {

	types := map[string]func(*gg.Context){
		"coordinates":  drawCoordinates,
		"rect":         drawRect,
		"rect-rotated": drawRectRotated,
	}

	var keys []string
	for k := range types {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	output := flag.String("o", "", "Output file/directory")
	typ := flag.String("t", "", "Drawing type: [all | "+strings.Join(keys, " | ")+"]")

	flag.Parse()

	if *typ == "" {
		panic(fmt.Errorf("missing image type"))
	}

	ctx := newContext()

	if *typ != "" {
		if *typ == "all" {
			for _, k := range keys {
				types[k](ctx)
				outputFile := filepath.Join(*output, k+".png")
				if err := saveContext(ctx, outputFile); err != nil {
					panic(err)
				}
				ctx = newContext()
			}
			return
		}
		fn, ok := types[*typ]
		if !ok {
			panic(fmt.Errorf("unknown drawing type %q", *typ))
		}
		fn(ctx)
	}

	if err := saveContext(ctx, *output); err != nil {
		panic(err)
	}
}
