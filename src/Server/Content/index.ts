import PrismaManager from "@/Prisma";
import { ResponseBody } from "@/Router";
import { ContentRequest } from "@/Router/content";
import { Prisma } from "@prisma/client";

let contentProxy : Prisma.ContentsDelegate = PrismaManager.getPrisma().contents;
let prisma = PrismaManager.getPrisma();


export async function getContent(contentRequest:ContentRequest, responseBody : ResponseBody) {
    await PrismaManager.transaction(async (prisma) =>
    {

        let sql = `select c.*,login.username from contents c 
            left join login on login.id = c.user_id 
            where music_id = ${contentRequest.music_id} and type = 'music'`

        // let contentList =  await prisma.contents.findMany({
        //     where : {
        //         type : contentRequest.type,
        //         music_id : contentRequest.music_id
        //     }
        // })

        let contentList = await PrismaManager.execute(sql);

        if(!contentList)
        {
            throw new Error("get Content Error")
        }

        responseBody.setResponseData({
            content : contentList,
            text : 'add playTable success'
        })

    })
}

export async function addContent(contentRequest:ContentRequest, responseBody : ResponseBody)
{
    await PrismaManager.transaction(async (prisma) =>
    {
        let currTime = new Date().getTime();
        let status = await prisma.contents.create({
            data : {
                user_id : contentRequest.user_id,
                music_id : contentRequest.music_id,
                father_id : 0,
                thumbs : 0,
                type : "music",
                time : currTime,
                content : contentRequest.content
            }
        })
        console.log(status)

        if(!status)
        {
            throw new Error("add content error");
        }


        responseBody.setResponseData({
            "text" : "add content success"
        })
    })
}

export async function deleteContent(contentRequest:ContentRequest, responseBody : ResponseBody) {
    await PrismaManager.transaction(async (prisma) =>
    {
        let status =  await prisma.contents.delete({
            where : {
                id : contentRequest.id,
                user_id : contentRequest.user_id
            }
        })

        if(!status)
        {
            throw new Error(`delete content ${contentRequest.id} fail`)
        }

        responseBody.setResponseData({
            "text" : "delete content success"
        })

    })
}

export async function addThubms(contentRequest:ContentRequest, responseBody : ResponseBody)
{
    await PrismaManager.transaction(async (prisma) =>
    {
        let content = await prisma.contents.findFirst({
            where : {
                id : contentRequest.id
            }
        })

        if(!content)
        {
            throw new Error("add thumbs error");
        }

        await prisma.contents.update({
            where : {
                id : contentRequest.id,
            },
            data : {
                thumbs : content.thumbs + 1
            }
        })


        responseBody.setResponseData({
            "text" : "add thumbs success"
        })
    })
}


