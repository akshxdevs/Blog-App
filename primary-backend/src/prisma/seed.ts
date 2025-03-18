import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()
async function main(){
    await prismaClient.blog.create({
        data:{
            title:"sentences that have altered my perception",
            subtitle:"and my brain chemistry",
            writings:"You ever hear or read something that makes you walk around the block for a while? Taking deep breaths, nodding, like how has this never occurred to me before? In all the big and small ways, these are sentences that I wrote down in margins, on bills fished out of my tote bags, across pages of my journals.The quotes that have stuck with me, and somehow found their way to me when I needed them the most. While some people see angel numbers everywhere, I catch the words screaming, waiting for me to find them.Please feel free to leave some of your personal favourites in the comments, because we can never learn enough. I never wrote down any sources because they were either spoken to me, or left somewhere without one, or I’ve simply forgotten. I’m not even sure if any of them might be lyrics to a song. If you recognise them, let me know, because my urge to consume the wisdoms in their entirety is insatiable.These have infiltrated my bubble, and changed my point of view.It will be okay, but it will be different.Everything is neutral until you give it meaning.If you weren’t capable, you wouldn’t have the desire. Your perception is your reality. You don’t see things as they are; you see things as you are.The version of you that you dream of becoming is already within you–waiting for permission to exist.Follow your plan, not your mood.",
            userId:"32d3f761-e243-422e-b080-77cac37167e3"
        }
    })  
}
    
main();