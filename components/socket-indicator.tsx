"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Circle, WifiOff } from "lucide-react";

export default function SocketIndicator() {
    const { isConnected } = useSocket();
    
    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="text-center border-none bg-amber-600 text-white"
            >
                <WifiOff className="h-4 w-4 mr-1 motion-safe:animate-pulse"/>
                Fallback: Polling every 1s
            </Badge>
        );
    } else {
        return (
            <Badge
                className="text-center border-none bg-emerald-600 text-white"
            >
                <Circle className="h-2 w-2 mr-1.5 bg-red-700 text-red-700 rounded-full motion-safe:animate-ping" />
                Live
            </Badge>
        );
    }
}