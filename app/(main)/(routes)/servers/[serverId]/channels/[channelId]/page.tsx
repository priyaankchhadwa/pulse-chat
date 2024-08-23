import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import ChatHeader from "@/components/chat/chat-header";

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
            serverid: params.serverId,
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
                serverId={channel.serverid}
                type="channel"
            />
        </div>
    );
}