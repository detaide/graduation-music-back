import PrismaManager from "@/Prisma";
import { ResponseBody } from "@/Router";
import { DeleteListArg, DeleteTableArg, playTableAddInfo, playlistAddInfo } from "@/Router/playlist";
import Time from "@/Utils/Time";
import { Prisma } from "@prisma/client";


let playTableProxy : Prisma.PlayTableDelegate = PrismaManager.getPrisma().playTable;
let playListProxy : Prisma.PlayListDelegate = PrismaManager.getPrisma().playList;
let prisma = PrismaManager.getPrisma();

export async function bringPlayTableByuserId(responseBody : ResponseBody, userId : number) {
    
    let playTableRetMap = {};

    let AllPlayTable = await playTableProxy.findMany({
        where : {
            user_id : userId
        }
    })

    if(!AllPlayTable || !AllPlayTable.length)
    {
        return responseBody.setResponseData([]);
    }

    let sql = `SELECT playlist.playtable_id, count(playlist.playtable_id) count from playlist
            left join playtable on playtable.id = playlist.playtable_id
            where playtable.user_id = ${userId}
            GROUP BY playlist.playtable_id;
    `

    let playlist : Array<{playtable_id : number, count : number}> = await PrismaManager.execute(sql);
    let playlistMap = playlist.reduce((obj, item) =>
    {
        obj[item.playtable_id] = item.count;
        return obj;
    }, {})

    AllPlayTable.forEach(async (item) =>
    {
        playTableRetMap[item.id] = {...item, count : playlistMap[item.id] || 0}
    })

    return responseBody.setResponseData(Object.values(playTableRetMap));
}

export async function bringPlayListByPlayTableId(responseBody : ResponseBody, playtableId : number) {
    let playlist = await playListProxy.findMany({
        where : {
            playtable_id : playtableId
        }
    });
    console.log(playlist)
    return responseBody.setResponseData(playlist);
}


export async function addPlayTable(responseBody : ResponseBody,  playtableAddInfo : playTableAddInfo) {
    let status = await PrismaManager.transaction(async (prisma) =>
    {
        let currTime = Time.currTime();
        let playtableItem = await prisma.playTable.create({
            data : {
                user_id : playtableAddInfo.user_id,
                playtable_name : playtableAddInfo.playtable_name,
                create_time : currTime,
                update_time : currTime
            }
        })

        if(!playtableItem)
        {
            throw new Error("add playTable Error")
        }

        responseBody.setResponseData({
            playtable_id : playtableItem.id,
            text : 'add playTable success'
        })
    })

}

export async function addPlayList(responseBody:ResponseBody, playlistAddInfo : playlistAddInfo) {
    let status = await PrismaManager.transaction(async (prisma) =>
    {
        let playlist = await checkplaylistMusicId(playlistAddInfo.music_id, playlistAddInfo.playtable_id);

        if(playlist)
        {
            return responseBody.setResponseData({
                type : 'exist'
            })
            
        }
        let currTime = Time.currTime();
        let playlistItem = await prisma.playList.create({
            data : {
                playtable_id : playlistAddInfo.playtable_id,
                music_id : playlistAddInfo.music_id,
                create_time : currTime,
            }
        })

        if(!playlistItem)
        {
            throw new Error("add playTable Error")
        }

        responseBody.setResponseData({
            playlist_id : playlistItem.id,
            text : 'add playlist success'
        });
    })

}

export async function checkplaylistMusicId(musicId:number, playtable_id : number) {
    let playlist = await prisma.playList.findFirst({
        where : {
            music_id : musicId,
            playtable_id : playtable_id
        }
    })

    return playlist || null;
}

export async function deletePlayTable(responseBody : ResponseBody, playtableDeleteInfo : DeleteTableArg)
{
    await PrismaManager.transaction(async (prisma) =>
    {
        
        let deletePlayTable = await prisma.playTable.delete({
            where : {
                id : playtableDeleteInfo.playtable_id
            }
        })
        

        if(!deletePlayTable)
            throw new Error("删除歌单错误")

        let deletePlayList  = await prisma.playList.deleteMany({
            where : {
                playtable_id : playtableDeleteInfo.playtable_id
            }
        })

        if(!deletePlayList)
            throw new Error("删除歌单错误")

        responseBody.setResponseData("删除成功")
    })
}

export async function deleteListTable(responseBody : ResponseBody, playtableDeleteInfo : DeleteListArg)
{
    await PrismaManager.transaction(async (prisma) =>
    {
        let deleteListList  = await prisma.playList.deleteMany({
            where : {
                id : playtableDeleteInfo.playlist_id,
                playtable_id : playtableDeleteInfo.playtable_id
            }
        })

        if(!deleteListList)
            throw new Error("删除歌单错误")

        responseBody.setResponseData("删除成功")
    })
}

export async function bringPlayTableByPlayTableId(responseBody :ResponseBody, tableId : number) {
    let playInfo =  await playTableProxy.findFirst({
        where : {
            id : tableId
        }
    })

    responseBody.setResponseData(playInfo);
    
}