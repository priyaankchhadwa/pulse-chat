"use client";

import { useEffect, useState } from "react";

import {
    ControlBar,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
  } from "@livekit/components-react";
  import "@livekit/components-styles";
  import { Track } from "livekit-client";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export default function MediaRoom({
    chatId,
    video,
    audio
}: MediaRoomProps) {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user?.firstName} ${user?.lastName}`;

        (async () => {
            try {
                const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await response.json();
                setToken(data.token);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin my-4" />
                <p className="text-muted-foreground">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
            style={{ height: '95dvh' }}
        >
            <VideoConference />
        </LiveKitRoom>
    );
}