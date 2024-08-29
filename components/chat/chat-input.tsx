"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmojiPicker from "@/components/emoji-picker";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "channel" | "conversation";
}

const formSchema = z.object({
    content: z.string().min(1)
})

export default function ChatInput({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) {
    const { onOpen } = useModal();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });
            await axios.post(url, values);

            form.reset()
            router.refresh();
        } catch (error) {
            console.log(values);
        }
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className="absolute left-8 top-7 w-6 h-6 bg-muted-foreground/50 hover:bg-muted-foreground/90 rounded-full transition p-1 flex items-center justify-center"

                                    >
                                        <Plus className="text-primary"/>
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className="px-14 py-6 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary/10 text-primary"
                                        placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                                        {...field}
                                    />
                                    <div className="absolute right-8 top-7">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(field.value + emoji) }
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}