"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side: "top" | "bottom" | "left" | "right";
    align: "start" | "center" | "end";
}

export function ActionTooltip({
    label,
    children,
    side,
    align
}: ActionTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="shadow-md dark:shadow-foreground/20">
                    <p className="font-semibold text-sm">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}