"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import UserAvatar from "../user-avatar";

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-rose-500"/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 w-4 h-4 text-purple-500"/>,
    [MemberRole.GUEST]: null,
}

export default function ServerMember({
    member,
    server
}: ServerMemberProps) {
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];

    return (
        <button
            className={cn(
                "group p-2 rounded-md flex items-center gap-x-2 w-full mb-1 hover:bg-primary/20 transition",
                params?.memberId === member.id && "bg-primary/40"
            )}
        >
            <UserAvatar
                src={member.profile.imageUrl}
                className="w-8 h-8 md:h-8 md:w-8"
            />
            <p
                className={cn(
                    "font-semibold text-sm text-muted-foreground group-hover:text-accent-foreground transition",
                    params?.channelId === member.id && "text-primary"
                )}
            >
                {member.profile.name}
            </p>
            {icon}
        </button>
    );
}