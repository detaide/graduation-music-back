import { PlayTable } from "@prisma/client";
import RouterManager, { ResponseBody } from ".";
import tools  from "@/Utils";
import * as PlayTableManager from "@/Server/PlayList"

export async function playListPath()
{
    let router = RouterManager.getRouter();

    await router.get("/playTable", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let query = ctx.request.query;
        let userId  = +(query.id as string);

        if(!userId || isNaN(userId))
        {
            responseBody.setResponseReason("userId is empty");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.bringPlayTableByuserId(responseBody, userId);
        RouterManager.Response(ctx, responseBody);
    })


    await router.get("/playlist", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let query = ctx.request.query;
        let playTableId  = +(query.playTable_id as string);

        if(!playTableId || isNaN(playTableId))
        {
            responseBody.setResponseReason("playTableId is empty");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.bringPlayListByPlayTableId(responseBody, playTableId)
        RouterManager.Response(ctx, responseBody);
    })

    await router.get("/playTableInfo", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let query = ctx.request.query;
        let playTableId  = +(query.playTable_id as string);

        if(!playTableId || isNaN(playTableId))
        {
            responseBody.setResponseReason("playTableId is empty");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.bringPlayTableByPlayTableId(responseBody, playTableId)
        RouterManager.Response(ctx, responseBody);
    })

    await router.post("/add_playtable", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let playtableAddInfo = ctx.request.body as playTableAddInfo;

        if(!playtableAddInfo || !playtableAddInfo.user_id || !playtableAddInfo.playtable_name)
        {
            responseBody.setResponseReason("playtableAddInfo args error");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.addPlayTable(responseBody, playtableAddInfo)
        RouterManager.Response(ctx, responseBody);
    })

    await router.post('/add_playlist', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let playlistAddInfo = ctx.request.body as playlistAddInfo;

        if(!playlistAddInfo || !playlistAddInfo.user_id || !playlistAddInfo.playtable_id || !playlistAddInfo.music_id)
        {
            responseBody.setResponseReason("playlistAddInfo args error");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.addPlayList(responseBody, playlistAddInfo);
        RouterManager.Response(ctx, responseBody);
    })

    await router.post('/delete_playtable', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let playtableDeleteInfo = ctx.request.body as DeleteTableArg;

        if(!playtableDeleteInfo || !playtableDeleteInfo.user_id || !playtableDeleteInfo.playtable_id)
        {
            responseBody.setResponseReason("args error");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.deletePlayTable(responseBody, playtableDeleteInfo);
        RouterManager.Response(ctx, responseBody);
    })

    await router.post('/delete_playlist', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let playlistDeleteInfo = ctx.request.body as DeleteListArg;
        console.log(playlistDeleteInfo)

        if(!playlistDeleteInfo || !playlistDeleteInfo.user_id || !playlistDeleteInfo.playlist_id || !playlistDeleteInfo.playtable_id)
        {
            responseBody.setResponseReason("args error");
            return RouterManager.Response(ctx, responseBody);
        }

        await PlayTableManager.deleteListTable(responseBody, playlistDeleteInfo);
        RouterManager.Response(ctx, responseBody);
    })
}

export interface playTableAddInfo
{
    user_id : number,
    playtable_name : string,
}

export interface DeleteTableArg
{
    user_id: number,
    playtable_id : number
}

export interface DeleteListArg
{
    user_id : number,
    playlist_id : number,
    playtable_id : number
}

export interface playlistAddInfo
{
    user_id : number,
    playtable_id : number,
    music_id : number
}