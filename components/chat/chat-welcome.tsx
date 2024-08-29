import { Hash } from "lucide-react";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
}

export default function ChatWelcome({
    name,
    type
}: ChatWelcomeProps) {
    return (
        <div className="space-y-2 px-4 mb-4">
            {type === "channel" && (
                <div
                    className="h-[75px] w-[75px] flex items-center justify-center rounded-full bg-primary/10"
                >
                    <Hash className="w-12 h-12 text-primary" />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type === "channel" ? "Welcome to #" : ""}{name}
            </p>
            <p className="text-muted-foreground text-sm">
                This is the start of {type === "channel" ? `the #${name} channel` : `your convo with ${name}`}
            </p>
        </div>
    )
}