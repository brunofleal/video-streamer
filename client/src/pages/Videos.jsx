import React, {useState} from "react";

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

function Videos() {
    const [videos, setVideos] = useState([]);
    fetch('/api/videos')
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data);
        setVideos(data.data);
    });

    return (
    <Stack direction="column" spacing={1} style={{backgroundColor:'white', maxWidth:'40%'}}>
      {
        videos.map( (value) => {
            return <Link href={`/api/video/${value.slice(value.lastIndexOf('/') + 1)}`}
                textAlign={"left"}
                borderBottom={'solid black 3px'}
                padding={'5px'}>
                {value.slice(value.lastIndexOf('/') + 1)}
                </Link>
        })
      }

    </Stack>
    )
}

export default Videos;