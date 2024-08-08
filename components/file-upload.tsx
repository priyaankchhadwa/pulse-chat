"use client"

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

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
                    <X className="h-5 w-5" />
                </button>
            </div>
        )}

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