const fs = require('fs')

const rawdata = fs.readFileSync('./serverConfig.json');
let serverConfig = JSON.parse(rawdata);
let availableFileInfos = getAvailableFileInfos();

function filterFiles(files, folder) {
    const VIDEO_EXTENSION = '.mp4';
    files = files.filter((value) => {
        return value.endsWith(VIDEO_EXTENSION);
    });
    files = files.map( (value) => {
        return `${folder}/${value}`;
    } );
    return files;
}

function getPaths(dirs) {
    let paths = [];
    let folders = [];
    for ( let dir of dirs) {
        folders.push(dir);
        let files = fs.readdirSync(dir);

        let _folders = files.filter((filename) => {
            return fs.statSync(dir + "/" + filename).isDirectory()
         });

         _folders = _folders.map( (value) => {
            return `${dir}/${value}`;
          });
         folders.push(..._folders);
    }

    for ( let folder of folders) {
        let files = fs.readdirSync(folder);

        files = filterFiles(files, folder);

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
    paths.sort();
    return paths;
}

function getAvailableFileInfos() {
    const BYTES_PER_MB = 1024 ** 2;
    const files = getAvailablePaths();
    let fileInfos = [];
    for (const [i, filepath] of files.entries()) {
        const stat = fs.statSync(filepath);
        let sizeInMb = stat.size / BYTES_PER_MB;
        let creationTimestamp = stat.birthtime;
        let fileInfo = {id: i, path: filepath, size: `${Math.round(sizeInMb)} MB`, creationTimestamp};
        fileInfos.push(fileInfo);
    }
    return fileInfos;
}

function getFullPathFromFile(index) {
    if ( availableFileInfos[index] == undefined) {
        console.log('> Unexpected retrieval of list of files')
        availableFileInfos = getAvailableFileInfos();
    }
    return availableFileInfos[index].path;

}

function availableFileCount() {
    return availableFileInfos.length;
}

function getVideoInfo(id) {
    return {
        name:availableFileInfos[id].path.slice(availableFileInfos[id].path.lastIndexOf('/') + 1),
        ...availableFileInfos[id]
    }
}

module.exports = {
    availableFileInfos,
    getFullPathFromFile,
    availableFileCount,
    getVideoInfo
}