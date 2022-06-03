import React, {useState, useEffect} from "react";
import {  useParams  } from 'react-router-dom';
import Link from '@mui/material/Link';

import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

function Video() {

  const [data, setData] = useState(null);
  const [videoCount, setVideoCount] = useState(0);
  const [videoInfo, setVideoInfo] = useState({name:'', size: ''});

  const {videoid} = useParams();


  useEffect(() => {
    fetch(`/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));

    fetch(`/api/videos/count`)
      .then((res) => res.json())
      .then((data) =>  {
        setVideoCount(parseInt(data.count));
    });

    fetch(`/api/video/info/${videoid}`)
      .then((res) => res.json())
      .then((data) =>  {
        console.log({data})
        setVideoInfo(data.info);
    });
  }, []);

    const getNextVideoEndpoint = (action) => {
      let newVideoId = videoid;
      if (action === "next") {
        newVideoId = parseInt(newVideoId) + 1;
      } else if (action === "previous") {
        newVideoId = parseInt(newVideoId) - 1;
      } else if (action === "random") {
        newVideoId = Math.floor(Math.random() * videoCount);
      }

      return `/video/${newVideoId}`;
    }

  return (
    <div className="App">
      <header className="App-header">
          <Link href={'/videos'}>Videos</Link>
        {!data ? <p>"Loading..."</p> : <></>}
        <p>{`(${videoid}/${videoCount})`}</p>
        <p>{`${videoInfo.name} (${videoInfo.size}MB)`}</p>
        <VideoPlayer videoid={videoid}></VideoPlayer>
        <Link href={getNextVideoEndpoint("previous")}> Previous </Link>
        <Link href={getNextVideoEndpoint("next")}> Next </Link>
        <Link href={getNextVideoEndpoint("random")}> Random </Link>

      </header>
    </div>

  );
}

export default Video;