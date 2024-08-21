"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

export default function ServerChannel({
    channel, server, role
}: ServerChannelProps) {
    const router = useRouter();
    const params = useParams();

    const Icon = iconMap[channel.type];

    return (
        <button
            onClick={() => {}}
            className={cn(
                "group p-2 rounded-md flex items-center gap-x-2 w-full mb-1 hover:bg-primary/20 transition",
                params?.channelId === channel.id && "bg-primary/20"
            )}
        >
            <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <p
                className={cn(
                    "line-clamp-1 font-semibold text-sm text-muted-foreground group-hover:text-accent-foreground transition",
                    params?.channelId === channel.id && "text-primary"
                )}
            >
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="edit">
                        <Edit
                            className="hidden group-hover:block w-4 h-4 text-muted-foreground hover:text-accent-foreground transition"
                        />
                    </ActionTooltip>
                    <ActionTooltip label="delete">
                        <Trash
                            className="hidden group-hover:block w-4 h-4 text-muted-foreground hover:text-accent-foreground transition"
                        />
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-muted-foreground" />
            )}
        </button>
    )
}