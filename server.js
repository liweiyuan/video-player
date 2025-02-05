const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const PORT = 3000;

//设置静态文件目录
app.use(express.static('public'));

//视频转码为 HLS 格式
app.get('/convert', (req, res) => {
    const inputPath = path.join(__dirname, 'videos', 'input.mp4');
    const outputDir = path.join(__dirname, 'public', 'output');
    const outputFile = path.join(outputDir, 'output.m3u8');

    //检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
        console.error('Input file does not exist:', inputPath);
        return res.status(404).send('Input video file not found');
    }

    //确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    ffmpeg(inputPath)
        .addOption('-hls_time', '10')
        .addOption('-hls_list_size', '0')
        .addOption('-f', 'hls')
        .output(outputFile)
        .on('start', (commandLine) => {
            console.log('FFmpeg started with command:', commandLine);
        })
        .on('progress', (progress) => {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .on('end', () => {
            console.log('FFmpeg processing finished successfully');
            res.send('Video converted to HLS format!');
        })
        .on('error', (err) => {
            console.error('Error converting video:', err);
            console.error('FFmpeg path:', ffmpeg.path);
            console.error('Input path:', inputPath);
            console.error('Output path:', outputFile);
            res.status(500).send('Error converting video');
        })
        .run();
})

//启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('FFmpeg path:', ffmpegPath);
})