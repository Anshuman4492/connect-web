import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const VideoCall = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const roomIdRef = useRef(null);

  useEffect(() => {
    if (!user || !targetUserId) return;

    const { _id: userId, firstName } = user;
    const roomId = [userId, targetUserId].sort().join("_");
    roomIdRef.current = roomId;

    const socket = createSocketConnection();
    socketRef.current = socket;

    const peerConnection = new RTCPeerConnection();
    peerConnectionRef.current = peerConnection;

    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    // 🔹 Get camera/mic and add to peer connection
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!localVideoRef.current) return;
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.onloadedmetadata = () => {
          localVideoRef.current
            .play()
            .catch((err) => console.warn("Local play() failed:", err));
        };

        // ✅ Add tracks only if peerConnection is still valid
        if (
          peerConnectionRef.current &&
          peerConnectionRef.current.signalingState !== "closed"
        ) {
          stream.getTracks().forEach((track) => {
            try {
              peerConnectionRef.current.addTrack(track, stream);
            } catch (err) {
              console.warn("Track may already be added:", err);
            }
          });
        } else {
          console.warn("PeerConnection closed before tracks could be added");
        }
      } catch (err) {
        console.error("Failed to get local stream", err);
      }
    };

    // 🔹 When remote stream is received
    peerConnection.ontrack = (event) => {
      const stream = event.streams[0];
      if (remoteVideo.srcObject !== stream) {
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
      }
    };

    // 🔹 ICE candidate exchange
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice candidate", event.candidate, roomId);
      }
    };

    // 🔹 Join room and start process
    (async () => {
      await initLocalStream();

      socket.emit("joinVideoCall", { firstName, userId, targetUserId });

      socket.on("userJoined", async ({ userId: remoteUserId }) => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("offer", offer, roomId);
      });

      socket.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer, roomId);
      });

      socket.on("answer", async (answer) => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      });

      socket.on("ice candidate", async (candidate) => {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("ICE error:", err);
        }
      });
    })();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, targetUserId]);

  return (
    <div className="border border-white rounded-sm h-[57vh] w-2/5 mx-auto my-auto absolute inset-0">
      <video ref={remoteVideoRef} id="remote-video" autoPlay playsInline />
      <div className="border border-white rounded-sm w-1/4 mt-auto absolute right-0 bottom-0 m-3">
        <video
          ref={localVideoRef}
          id="local-video"
          muted
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoCall;
