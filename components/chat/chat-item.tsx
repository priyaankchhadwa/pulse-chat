"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, FileText, ShieldAlert, ShieldCheck, Trash } from "lucide-react";

import { Member, Profile } from "@prisma/client";
import { cn } from "@/lib/utils";

import UserAvatar from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    "ADMIN": <ShieldAlert className="mr-2 w-4 h-4 text-rose-500"/>,
    "MODERATOR": <ShieldCheck className="mr-2 w-4 h-4 text-purple-500"/>,
    "GUEST": null,
}

const formSchema = z.object({
    content: z.string().min(1)
})

export default function ChatItem({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}: ChatItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });

            await axios.patch(url, values);

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        form.reset({
            content: content
        })
    }, [form, content]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.code === "Escape") {
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = member.role == "ADMIN";
    const isModerator = member.role == "MODERATOR";
    const isOwner = member.id == currentMember.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType == "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl

    return (
        <div className="relative group flex items-center hover:bg-foreground/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href="{fileUrl}"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center h-48 w-48 bg-transparent"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />

                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-foreground/15">
                            <FileText className="h-10 w-10 fill-accent stroke-accent-foreground"/>
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="ml-2 text-sm hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                "text-sm text-primary",
                                deleted && "italic text-muted-foreground text-xs mt-1"
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-muted-foreground">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex items-center w-full gap-x-2 pt-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary/10 text-primary"
                                                        placeholder="Edited message..."
                                                        {...field}
                                                    />
                                                    
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button size="sm" disabled={isLoading}>
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] text-muted-foreground mt-1">
                                Press Esc to cancel or Enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-1 right-5 border rounded-sm bg-muted">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer ml-auto w-4 h-4 text-muted-foreground hover:text-accent-foreground transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                        <Trash 
                            className="cursor-pointer ml-auto w-4 h-4 text-muted-foreground hover:text-accent-foreground transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    )
}