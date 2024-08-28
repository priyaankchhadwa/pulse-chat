import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";

interface ChannelIdPageProps {
    params: {
        serverId: string
        channelId: string
    }
}

export default async function ChannelIdPage({
    params
}: ChannelIdPageProps) {
    const profile = await currentProfile();

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    if (!channel || !member) {
        return redirect("/");
    }


    return (
        <div
            className="flex flex-col h-full"
        >
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <div
                className="flex-1"
            >
                Future Messages
            </div>
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
            />
        </div>
    );
}