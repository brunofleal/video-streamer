import React, {useEffect, useState} from "react";

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

function getSliceInterval(currentPage, maxPage, videosLength) {
    let start = Math.round(((currentPage-1) / maxPage) * videosLength);
    let end = Math.round((currentPage / maxPage) * videosLength);

    return [start, end]
}

function Videos() {
    const linksPerPage = 10;
    const [sliceInterval, setSliceInterval] = useState([0, 10]);
    const [videos, setVideos] = useState([]);

    useEffect(()=> {
        function fetchData() {
            console.log('fetching videos')
            fetch('/api/videos')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setVideos(data.data);
                handlePageChange(1);
            });
        }
        fetchData();
    }, [])

    function handlePageChange (currentPage) {
        let sliceInt = getSliceInterval(currentPage, Math.round(videos.length/linksPerPage), videos.length);
        setSliceInterval(sliceInt);
    }

    function getVideosSubset() {
        let subset = videos.slice(sliceInterval[0], sliceInterval[1]);
        return subset;
    }

    return (
    <Stack direction="column" spacing={1} style={{backgroundColor:'gray', width:'60vw', height:'80vh', overflow:'auto'}}>
        <Pagination count={Math.round(videos.length/linksPerPage)} color="primary" backgroundColor={"white"} onChange={(event, page) => handlePageChange(page)}/>
      {
        getVideosSubset().map( (file) => {
            return <Link href={`/video/${file.id}`}
                textAlign={"left"}
                borderBottom={'solid black 3px'}
                padding={'5px'}>
                {`${file.path.slice(file.path.lastIndexOf('/') + 1)} | size ${file.size}`}
                </Link>
        })
      }

    </Stack>
    )
}

export default Videos;