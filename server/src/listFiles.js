const fs = require('fs')

const rawdata = fs.readFileSync('./serverConfig.json');
let serverConfig = JSON.parse(rawdata);

function getPaths(dirs) {
    const VIDEO_EXTENSION = '.mp4';
    let paths = [];
    for ( let dir of dirs) {
        let files = fs.readdirSync(dir);
        files = files.filter((value) => {
            return value.endsWith(VIDEO_EXTENSION);
        });
        files = files.map( (value) => {
            return `${dir}/${value}`;
        } );
        paths.push(...files);
    }
    return paths;
}

function getAvailablePaths() {
    let paths = [];
    paths.push(...getPaths([serverConfig.video.sources.local]));
    if (serverConfig.video.sources.has_remote) {
        paths.push(...getPaths(serverConfig.video.sources.remote));
    }
    return paths;
}

module.exports = {
    getAvailablePaths
}