import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";



export default async function SetupPage() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <>
      Create a server!
    </>
  );
}
