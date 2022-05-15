const express = require("express");
const stream = require("stream");
const fs = require('fs');

const { getAvailablePaths } = require('./listFiles');

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Api is ok!" });
});

app.get("/api/videos", (req, res) => {

    res.json({ data: getAvailablePaths() });
});

app.get('/api/video/:path', function (req, res) {
    console.log({'req_params_path': req.params.path});
    const path = 'files/sample-mp4-file.mp4' // req.params.path; //
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize =  2**6 //(end - start) + 1
        const file = fs.createReadStream(path, { start, end })
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
        fs.createReadStream(path).pipe(res)
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});