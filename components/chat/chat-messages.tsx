"use client";

import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import { Member, Message, Profile } from "@prisma/client";

import { useChatQuery } from "@/hooks/use-chat-query";
import useChatSocket from "@/hooks/use-chat-socket";

import ChatWelcome from "@/components/chat/chat-welcome";
import ChatItem from "@/components/chat/chat-item";
import { useChatScroll } from "@/hooks/use-chat-scroll";

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
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:message:update`

    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

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

    useChatSocket({ queryKey, addKey, updateKey });

    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && hasNextPage,
        count: data?.pages?.[0]?.items.length ?? 0
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
        <div ref={chatRef} className="flex flex-1 flex-col py-4 overflow-y-auto">
            {!hasNextPage && (
                <>
                    <div className="flex-1" />
                    <ChatWelcome
                        name={name}
                        type={type}
                    />
                </>
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="w-9 h-9 animate-spin my-4 text-muted-foreground" />
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-xs my-4 text-muted-foreground hover:text-foreground transition"
                        >
                            Load previous messages
                        </button>
                    )
                    }
                </div>
            )}
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
            <div ref={bottomRef} />
        </div>
    )
}