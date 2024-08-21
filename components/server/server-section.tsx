"use client"

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}


export default function ServerSection({
    label,
    role,
    sectionType,
    channelType,
    server,
}: ServerSectionProps) {
    const { onOpen } = useModal();


    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-muted-foreground">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top" align="center">
                    <button 
                        onClick={() => onOpen("createChannel", { channelType })}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Plus className="w-4 h-4"/>
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage members" side="top" align="center">
                    <button 
                        onClick={() => onOpen("members", { server })}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Settings className="w-4 h-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}