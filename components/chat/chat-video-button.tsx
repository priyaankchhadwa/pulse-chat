"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Icon, Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";


export default function ChatVideoButton() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isVideo = searchParams?.get("video");

    const onClick = () => {
        const url = qs.stringifyUrl({
           url: pathname || "", 
           query: {
               video: isVideo ? undefined : true
           }
        }, { skipNull: true });

        router.push(url);
    };

    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End call" : "Start call";

    return (
        <ActionTooltip label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition mr-4">
                <Icon className="w-6 h-6 text-muted-foreground"/>
            </button>
        </ActionTooltip>
    )
}