import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import NavigationAction from "@/components/navigation/navigation-action";
import NavigationItem from "@/components/navigation/navigation-item";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function NavigationSidebar() {
    const profile = await currentProfile();

    if (!profile) {
        redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    return (
        <div
            className="space-y-4 py-3 flex flex-col items-center h-full bg-primary/15 dark:bg-secondary/50"
        >
            <NavigationAction />
            <Separator
                className="h-[2px] w-12 bg-accent rounded-md mx-auto" 
            />
            <ScrollArea className="w-full flex-1">
                {servers.map(server => (
                    <div
                        key={server.id}
                        className="mb-4"
                    >
                        <NavigationItem 
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton 
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "h-12 w-12"
                        }
                    }}
                />
            </div>
        </div>
    );
}