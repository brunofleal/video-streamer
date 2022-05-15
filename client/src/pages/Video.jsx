import React, {useState, useEffect} from "react";
import { useParams  } from 'react-router-dom';
import Link from '@mui/material/Link';

import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

function Video() {

  const [data, setData] = useState(null);
  const {videoid} = useParams();
  console.log(videoid)

  useEffect(() => {

    fetch(`/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <Link href={'/videos'}>Videos</Link>
        {!data ? <p>"Loading..."</p> : <></>}
        <VideoPlayer videoid={videoid}></VideoPlayer>
      </header>
    </div>

  );
}

export default Video;