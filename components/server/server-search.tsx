"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
    CommandDialog, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList 
} from "@/components/ui/command";

import { Search } from "lucide-react";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined;
    }[]
}

export default function ServerSearch({ data }: ServerSearchProps) {
    const [open, setOpen] = useState(false);
    const [modifierKey, setModifierKey] = useState("ctrl");

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        setModifierKey(window.navigator.userAgent.includes("Mac") ? "⌘" : "ctrl");

        const searchShortcut = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        window.addEventListener("keydown", searchShortcut);
        return () => window.removeEventListener("keydown", searchShortcut);
    }, []);

    const onClick = (id: string, type: "channel" | "member" ) => {
        setOpen(false);

        if (type == "member") {
            router.push(`/servers/${params?.serverId}/conversations/${id}`);
        }
        if (type == "channel") {
            router.push(`/servers/${params?.serverId}/channels/${id}`);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/20 dark:hover:bg-zinc-700/50 transition"
            >
                <Search 
                    className="w-4 h-4 text-muted-foreground"
                />
                <p
                    className="font-semibold text-sm text-muted-foreground group-hover:text-foreground transition"
                >
                    Search
                </p>
                <kbd
                    className="pointer-events-none inline-flex h-5 select-none items-center gap-1 font-mono text-[10px] text-muted-foreground font-medium ml-auto"
                >
                    <span className="text-xs bg-background rounded px-1.5 py-1">{modifierKey}</span>
                    <span className="text-xs bg-background rounded px-1.5 py-1">K</span> 
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search channels and members"/>
                <CommandList>
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ icon, name, id }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick(id, type)}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
}