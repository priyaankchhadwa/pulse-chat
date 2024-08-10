"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export default function InviteModal() {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const [copied, setCopied ] = useState(false);
    const [isLoading, setIsLoading ] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNewLink = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log("generate new link error", error);
            
        }
        finally {
            setIsLoading(false);
        }
    }
    

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex items-center text-center justify-center">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite People
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="font-bold uppercase text-xs">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied
                            ? <Check className="w-4 h-4"/>
                            : <Copy className="w-4 h-4"/>
                            }
                        </Button>
                    </div>
                    <Button
                        onClick={onNewLink}
                        variant="link"
                        size="sm"
                        className="text-xs"
                        disabled={isLoading}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 mx-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}