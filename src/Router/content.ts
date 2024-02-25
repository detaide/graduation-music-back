import RouterManager, { ResponseBody } from ".";
import * as ContentManager from "@/Server/Content"

export async function ContentPath()
{
    let router = RouterManager.getRouter();

    router.post('/get_content', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let ContentRequest = ctx.request.body as ContentRequest;
        console.log(ContentRequest)
        if(!ContentRequest || !ContentRequest.music_id || !ContentRequest.type)
        {
            responseBody.setResponseReason("ContentRequest args error");
            return RouterManager.Response(ctx, responseBody);
        }

        await ContentManager.getContent(ContentRequest, responseBody);

        RouterManager.Response(ctx, responseBody);

    })

    router.post('/add_content', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let ContentRequest = ctx.request.body as ContentRequest;

        if(!ContentRequest || !ContentRequest.music_id || !ContentRequest.type ||!ContentRequest.content || !ContentRequest.user_id)
        {
            responseBody.setResponseReason("add Content error");
            return RouterManager.Response(ctx, responseBody);
        }

        await ContentManager.addContent(ContentRequest, responseBody);

        RouterManager.Response(ctx, responseBody);
    })

    router.post('/delete_content', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let ContentRequest = ctx.request.body as ContentRequest;
        console.log(ContentRequest)
        if(!ContentRequest ||!ContentRequest.id || !ContentRequest.user_id)
        {
            responseBody.setResponseReason("delete Content error");
            return RouterManager.Response(ctx, responseBody);
        }

        await ContentManager.deleteContent(ContentRequest, responseBody);

        RouterManager.Response(ctx, responseBody);
    })

    router.post('/add_thumbs', async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let ContentRequest = ctx.request.body as ContentRequest;

        if(!ContentRequest  ||!ContentRequest.id)
        {
            responseBody.setResponseReason("add thumbs error");
            return RouterManager.Response(ctx, responseBody);
        }

        await ContentManager.addThubms(ContentRequest, responseBody);

        RouterManager.Response(ctx, responseBody);
        
    })
}

export interface ContentRequest
{
    id? : number
    music_id : number,
    type : string,
    content? : string,
    user_id? : number
}