"use client";

import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { Member, Message, Profile } from "@prisma/client";

import { useChatQuery } from "@/hooks/use-chat-query";

import ChatWelcome from "@/components/chat/chat-welcome";
import ChatItem from "@/components/chat/chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "conversationId" | "channelId";
    paramValue: string;
    type: "channel" | "conversation";
}

export default function ChatMessages({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) {
    const queryKey = `chat:${chatId}`
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="w-9 h-9 animate-spin my-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                    Loading messages...
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="w-9 h-9 my-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                    {"Something went wrong! We're working to fix it asap"}
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome
                name={name}
                type={type}
            />
            <div
                className="flex flex-col-reverse mt-auto"
            >
                {data?.pages?.map((group, index) => (
                    <Fragment key={index}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <div key={message.id}>
                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    content={message.content}
                                    member={message.member}
                                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    currentMember={member}
                                    isUpdated={message.updatedAt !== message.createdAt}
                                    socketUrl={socketUrl}
                                    socketQuery={socketQuery}
                                />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}