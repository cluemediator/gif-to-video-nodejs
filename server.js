const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");

const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath(ffprobe.path)
  .setFfmpegPath(ffmpegInstaller.path);

app.get('/gif-to-video', (req, res) => {
  ffmpeg
    .input('./images/result.gif')
    .noAudio()
    .outputOptions('-pix_fmt yuv420p')
    .output(`./output/result.mp4`)
    .on("end", () => {
      res.send({ message: 'Video Generated!' });
    })
    .on("error", (e) => console.log(e))
    .run();
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});