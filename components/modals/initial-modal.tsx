"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileUpload from "@/components/file-upload";



const formSchema = z.object({
    name: z.string().min(1, { message: "Servver name is required" }),
    imageUrl: z.string().min(1, { message: "Image URL is required" }),
})



export default function InitialModal() {
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(() => setIsMounted(true), []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values:z.infer<typeof formSchema>) {
        try {
            await axios.post("/api/servers", values);

            form.reset();
            router.refresh();
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    if (!isMounted) return null;

    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader className="flex items-center text-center justify-center">
                    <DialogTitle>
                        Create a server
                    </DialogTitle>
                    <DialogDescription>
                        Customize your server with a name and an image
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8">
                        <div className="space-y-8">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Server Image URL</FormLabel>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField control={form.control} name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="My server"
                                                className="input-bordered input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}