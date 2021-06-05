#!/usr/bin/env node

const { firefox } = require('playwright')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
const child_process = require('child_process')

async function getFrame(page, time) {
  await page.evaluate((time) => new Promise((resolve, reject) => {
    let done = false
    window.state.time = time
    const interval = setInterval(() => {
      if(done) return    
      if(window.state.notReady.length == 0) {      
        clearInterval(interval)
        done = true
        resolve()
      }
    }, 10)
    setTimeout(() => {
      if(done) return
      clearInterval(interval)
      done = true
      reject(new Error('timeout'))    
    }, 5000)
  }), time)

  const buffer = await page.screenshot({ type: 'png' });
  return buffer
}

async function main(argv) {
  if(argv.verbose) console.log("FFMPEG VERSION", ffmpegInstaller.version, ffmpegInstaller.path)

  const browser = await firefox.launch({
    headless: false,
    //executablePath: '/usr/bin/chromium'
  })
  const page = await browser.newPage()
  await page.goto(argv.url)
  if(argv.verbose) console.log("PAGE OPENED!")
  const options = await page.evaluate((videoElementId) => new Promise((resolve, reject) => {
    let done = false
    const interval = setInterval(() => {
      if(done) return
      if(window.state && window.state.length) {
        clearInterval(interval)
        done = true
        resolve({
          width: state.width,
          height: state.height,
          fps: state.fps,
          length: state.length
        })
      }
    }, 10)
    const timeout = setTimeout(() => {
      if(done) return
      clearInterval(interval)
      done = true
      reject('timeout')    
    }, 5000)
  }), argv.videoElement)
  page.setViewportSize({ width: options.width, height: options.height })
  if(argv.verbose) console.log("PAGE LOADED!")

  ffmpeg = child_process.spawn(ffmpegInstaller.path, [
    ...['-f', 'image2pipe'],
    ...['-framerate', `${options.fps}`],
    ...['-i', '-'],
    ...(options.alpha
      ? [
        // https://stackoverflow.com/a/12951156/559913
        ...['-c:v', 'qtrle'],

        // https://unix.stackexchange.com/a/111897
        // ...['-c:v', 'prores_ks'],
        // ...['-pix_fmt', 'yuva444p10le'],
        // ...['-profile:v', '4444'],
        // https://www.ffmpeg.org/ffmpeg-codecs.html#Speed-considerations
        // ...['-qscale', '4']
      ]
      : [
        ...['-c:v', 'libx264'],
        ...['-crf', '16'],
        ...['-preset', 'ultrafast'],
        // https://trac.ffmpeg.org/wiki/Encode/H.264#Encodingfordumbplayers
        ...['-pix_fmt', 'yuv420p'],
      ]),
    '-y',
    argv.out
  ], {
    stdio: ['pipe', 'inherit', 'inherit']
  })
  
  const timePerFrame = 1 / options.fps
  for(let time = 0; time < options.length; time += timePerFrame) {
    const screenshot = await getFrame(page, time)
    if(argv.verbose) console.log("GOT FRAME!", time, '/', options.length)
    ffmpeg.stdin.write(screenshot)
  }

  ffmpeg.stdin.end()
  
  browser.close()
  
}

const argv = require('yargs')
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'Source url',
    default: 'http://localhost:3000'
  })
  .option('out', {
    alias: 'o',
    type: 'string',
    description: 'Output video file',
    default: 'out.mp4'
  })
  .option('videoElement', {
    alias: 'e',
    type: 'string',
    description: 'Video output element id'
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  }).argv

main(argv)