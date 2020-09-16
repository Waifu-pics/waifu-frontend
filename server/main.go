package main

import (
	"log"

	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttp/reuseport"
)

// This is only meant to be run in docker container
// Is not meant for production

func main() {
	ln, err := reuseport.Listen("tcp4", "0.0.0.0:8082")
	if err != nil {
		log.Fatalf("Listener error: %s", err)
	}

	fs := &fasthttp.FS{
		Root:               "./dist",
		IndexNames:         []string{"index.html"},
		GenerateIndexPages: false,
		Compress:           true,
		PathNotFound: func(ctx *fasthttp.RequestCtx) {
			ctx.SetStatusCode(fasthttp.StatusOK)
			ctx.SendFile("./dist/index.html")
		},
	}

	fsHandler := fs.NewRequestHandler()

	requestHandler := func(ctx *fasthttp.RequestCtx) {
		fsHandler(ctx)
	}

	if err = fasthttp.Serve(ln, requestHandler); err != nil {
		log.Printf("Server error: %s\n", err)
	}
}
