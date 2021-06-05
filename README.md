# Vue Video Renderer

[![demo](https://github.com/MLaszczewski/vue-video-renderer/raw/master/examples/intro/out.gif)](https://youtu.be/Pfxqp1IxI4w)

I wanted to create a nice recording from automated tests and scenarios written in code. I could not find any nice solution for rendering and editing movies in JavaScript.

I found [html5-animation-video-renderer](https://github.com/dtinth/html5-animation-video-renderer) but it was not suitable for composing a movie from several recordings due html5 media element seek latency. I took a few lines from it to use image2pipe from ffmpeg.

## Usage

Check out the [examples](https://github.com/MLaszczewski/vue-video-renderer/tree/master/examples).

Run examples with `npm run dev`, and render with `npm run render`

## Features

- Real-time video preview and editing with Vite
- Rendering with playwright, firefox and screenshots piped to ffmpeg.
- Components for embedding input video and images.
- Time and playback rate control with console.

## TODO:

- Offline audio mixer for audio track rendering.
- Playback controls.
