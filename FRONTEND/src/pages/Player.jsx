import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoJS from "./VideoJs";
import videojs from "video.js";
import StreamStats from "../components/StreamStats";
import { Button } from "@radix-ui/themes";

export default function Player(query) {
  const magnetURI = useParams().magnetId;
  const [videoSrc, setVideoSrc] = useState("");
  const [subtitleSrc, setSubtitleSrc] = useState("");
  // console.log(magnetURI);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Add the torrent
      await axios.get(
        `http://localhost:8000/add/${encodeURIComponent(magnetURI)}`,
      );
      // Step 2: Set the video source for streaming
      setVideoSrc(
        `http://localhost:8000/stream/${encodeURIComponent(magnetURI)}`,
      );
      // Step 3: Set the subtitle source
      setSubtitleSrc(
        `http://localhost:8000/subtitles/${encodeURIComponent(magnetURI)}`,
      );
    } catch (error) {
      console.error("Error adding the torrent or streaming video", error);
    }
  };

  const handleVlcStream = async () => {
    try {
      await axios.get(
        `http://localhost:8000/add/${encodeURIComponent(magnetURI)}`,
      );

      // Send a request to the server to open VLC with the video stream URL
      await axios.get(
        `http://localhost:8000/stream-to-vlc?url=${encodeURIComponent(
          `http://localhost:8000/stream/${encodeURIComponent(magnetURI)}`,
        )}`,
      );
    } catch (error) {
      console.error("Error streaming to VLC", error);
    }
  };

  /* ------------------------------------------------------ */

  const videoPlayerOptions = {
    autoplay: true,
    controls: true,
    // fluid: true,
    // preload: "auto",
    height: 480,
    width: 854,
    textTrackSettings: true,
    sources: [
      {
        src: videoSrc,
        type: "video/webm",
      },
    ],
    tracks: [
      { src: subtitleSrc, kind: "captions", srclang: "en", label: "English" },
    ],
  };
  const playerRef = useRef(null);

  console.log(subtitleSrc);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  /* ------------------------------------------------------ */

  const handleRemoveTorrent = async () => {
    try {
      // Send a DELETE request to remove the torrent
      await axios.delete(
        `http://localhost:8000/remove/${encodeURIComponent(magnetURI)}`,
      );

      // Clear the video and subtitle sources
      setVideoSrc("");
      setSubtitleSrc("");

      // Dispose of the player if it's active
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    } catch (error) {
      console.error("Error removing the torrent", error);
    }
  };

  return (
    <div className="flex items-center justify-center font-space-mono">
      <div className="App w-3/5">
        {videoSrc && (
          <VideoJS options={videoPlayerOptions} onReady={handlePlayerReady} />
        )}
        <StreamStats magnetURI={magnetURI} />{" "}
        {/* We basiically do this to prevent video player re-render */}
        <div className="mt-5 flex gap-x-3">
          <Button
            onClick={handleSubmit}
            size="1"
            color="blue"
            variant="soft"
            type="submit"
          >
            Stream on Browser
          </Button>
          <Button
            size="1"
            color="orange"
            variant="soft"
            onClick={handleVlcStream}
          >
            Open in VLC
          </Button>
          <Button
            size="1"
            color="red"
            variant="soft"
            onClick={handleRemoveTorrent}
          >
            Stop and Remove
          </Button>
        </div>
      </div>
    </div>
  );
}