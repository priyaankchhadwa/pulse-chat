"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";



const formSchema = z.object({
    name: z.string().min(1, { message: "Servver name is required" }),
    imageUrl: z.string().min(1, { message: "Image URL is required" }),
})



export default function InitialModal() {
    const [isMounted, setIsMounted] = useState(false);
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
        console.log(values);
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
                                TODO: Add image upload
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