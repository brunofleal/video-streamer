import React from "react";
import { baseUrl } from "../../constants/constants";

function VideoPlayer({videoid}) {


    const VP = document.getElementById('videoPlayer') // player
    const handleOnClick = () => {
        const VPToggle = document.getElementById('toggleButton') // button
        if (VP.paused) VP.play()
        else VP.pause()
    }

    return (
        <div>
            <video style={{maxWidth:'60vw', maxHeight:'40vh'}} id="videoPlayer" controls onClick={handleOnClick} >
                <source src={`/api/video/${videoid}`} type="video/mp4"></source>
            </video>
        </div>
    );
}


export default VideoPlayer;
