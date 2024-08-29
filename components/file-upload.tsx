"use client"

import { FileText, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export default function FileUpload({
    onChange,
    value,
    endpoint
}: FileUploadProps) {
    const fileType = value?.split(".").pop();

    if (value && fileType == "pdf") {
        console.log(value);
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-foreground/15">
                <FileText className="h-10 w-10 fill-accent stroke-accent-foreground"/>
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ml-2 text-sm hover:underline"
                >
                    {value}
                </a>
                <button
                    onClick={() => onChange("")}
                    className="relative -top-6 -right-5 rounded-full shadow-lg bg-rose-500 text-secondary p-1.5"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if (value && fileType != "pdf") {
        return (
            <div className="relative h-40 w-40">
                <Image
                    src={value}
                    alt="Uploaded image"
                    fill
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="relative top-0 left-10 rounded-full shadow-lg bg-rose-500 text-secondary p-1.5"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}