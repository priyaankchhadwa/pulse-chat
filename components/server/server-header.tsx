"use client"

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
    ChevronDown,
    LogOut,
    PlusCircle,
    Settings,
    Trash,
    UserPlus, 
    Users 
} from "lucide-react";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole
}

export default function ServerHeader(
    { server, role }: ServerHeaderProps) 
{
    const { onOpen } = useModal();

    const isAdmin = role == MemberRole.ADMIN;
    const isModerator = isAdmin || role == MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-primary/10 border-b-2 hover:bg-primary/20 transition"
                >
                    {server.name}
                    <ChevronDown className="w-5 h-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-primary space-y-[2px]"
            >
                {isModerator && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("invite", { server: server })}
                        className="text-sm cursor-pointer text-purple-800 dark:text-purple-400 px-3 py-2"
                    >
                        Invite People
                        <UserPlus className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("editServer", { server: server })}
                        className="text-sm cursor-pointer px-3 py-2"
                    >
                        Server Settings
                        <Settings className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { server: server })}
                        className="text-sm cursor-pointer px-3 py-2"
                    >
                        Manage Members
                        <Users className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("createChannel", { server: server })}
                        className="text-sm cursor-pointer px-3 py-2"
                    >
                        Create Channel
                        <PlusCircle className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("deleteServer", { server: server })}
                        className="text-sm cursor-pointer px-3 py-2 text-rose-500"
                    >
                        Delete Server
                        <Trash className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("leaveServer", { server: server })}
                        className="text-sm cursor-pointer px-3 py-2 text-rose-500"
                    >
                        Leave Server
                        <LogOut className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    )};