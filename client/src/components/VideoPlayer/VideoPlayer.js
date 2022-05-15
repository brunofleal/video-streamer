import React from "react";
import { baseUrl } from "../../constants/constants";

function VideoPlayer({videoName}) {


    const VP = document.getElementById('videoPlayer') // player
    const handleOnClick = () => {
        const VPToggle = document.getElementById('toggleButton') // button
        if (VP.paused) VP.play()
        else VP.pause()
    }

    return (
        <div>
            <p>Player</p>
            <video id="videoPlayer" controls onClick={handleOnClick}>
                <source src={`${baseUrl}/api/video/${videoName}`} type="video/mp4"></source>
            </video>
        </div>
    );
}


export default VideoPlayer;
