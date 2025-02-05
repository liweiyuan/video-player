# Video HLS Converter

一个简单的视频转换服务器，可以将视频文件转换为 HLS (HTTP Live Streaming) 格式。

## 功能特点

- 将视频文件转换为 HLS 格式
- 支持视频流式播放
- 实时转换进度显示
- 自动创建必要的目录结构

## 安装要求

- Node.js (建议 v14 或更高版本)
- npm

## 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/liweiyuan/video-player.git
cd video-player
```

2. 安装依赖：
```bash
npm install
```

3. 启动服务器：
```bash
node server.js
```

4. 访问服务器：
```
http://localhost:3000
```

## 使用说明

1. 将视频文件放在 `videos` 目录下
   - 比如 `videos/input.mp4`
2. 访问 `http://localhost:3000` 
   - 点击按钮 `开始转换` 开始转换视频
   - 转换完成后，可以在 `public/output` 目录下找到转换后的文件
3. 视频会自动转换为 HLS 格式，并生成播放列表文件



## 依赖项

- express: Web 应用框架
- fluent-ffmpeg: FFmpeg 封装库
- @ffmpeg-installer/ffmpeg: FFmpeg 安装器

## 注意事项

- 确保 videos 目录中有名为 input.mp4 的视频文件
- 确保 public/output 目录具有写入权限
- 转换大文件可能需要较长时间，请耐心等待

## License

MIT