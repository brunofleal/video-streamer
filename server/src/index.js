const express = require("express");
const fs = require('fs');

const { availableFileInfos, getFullPathFromFile } = require('./listFiles');

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Api is ok!" });
});

app.get("/api/videos", (req, res) => {

    res.json({ data: availableFileInfos });
});

app.get('/api/video/:videoid', function (req, res) {
    const videoid = parseInt(req.params.videoid, 10);
    const filepath = getFullPathFromFile(videoid);

    const stat = fs.statSync(filepath)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize =  (end - start) + 1;
        const file = fs.createReadStream(filepath, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(filepath).pipe(res)
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});