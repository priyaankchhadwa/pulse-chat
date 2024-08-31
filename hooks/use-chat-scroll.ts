import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}

export function useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count 
}: ChatScrollProps) {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;            

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => topDiv?.removeEventListener("scroll", handleScroll);

    }, [shouldLoadMore, chatRef, loadMore]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;

        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if (!topDiv) {
                return false;
            }

            const distFromBottom = topDiv.scrollHeight - topDiv.clientHeight - topDiv.scrollTop;
            return distFromBottom <= 200;
        };

        if (shouldAutoScroll()) {
            bottomRef?.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}