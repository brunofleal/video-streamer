import React, {useState, useEffect} from "react";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer.js";

function Video( {videoName} ) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <VideoPlayer videoName={videoName}></VideoPlayer>
      </header>
    </div>

  );
}

export default Video;