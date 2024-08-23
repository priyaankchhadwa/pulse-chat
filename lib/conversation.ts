import { db } from "@/lib/db";

export default async function getOrCreateConversations(memberOneId: string, memberTwoId: string) {
    let conversation = await findConversations(memberOneId, memberTwoId) || await findConversations(memberTwoId, memberOneId);

    if (!conversation) {
        conversation = await createNewConverSation(memberOneId, memberTwoId);
    }

    return conversation;
}

async function findConversations(memberOneId: string, memberTwoId: string) {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId },
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        });
    } catch (error) {
        console.log("findConversations",error);
        return null;        
    }
}

async function createNewConverSation(memberOneId:string, memberTwoId:string) {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        });
    } catch (error) {
        console.log("createNewConverSation", error);
        return null;
    }
}