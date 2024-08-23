import { Hash } from "lucide-react";

import MobileToggle from "@/components/mobile-toggle";


interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export default function ChatHeader({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) {
    return (
        <div
            className="text-md font-semibold px-3 flex items-center h-12 border-primary/10 border-b-2"
        >
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <Hash className="w-5 h-5 mr-1 text-muted-foreground"/>
            )}
            <p
                className="font-semibold text-md"
            >
                {name}
            </p>
        </div>
    )
}