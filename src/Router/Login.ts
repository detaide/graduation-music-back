import { Login } from "@prisma/client";
import RouterManager, { ResponseBody } from ".";
// import { ConvertData } from "@/Utils";
import tools  from "@/Utils";
import LoginManager from "@/Server/Login";
import Loging from "@/Log/log";

export async function LoginPath()
{
    let router = RouterManager.getRouter();

    await router.post("/login", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        // console.log(ctx.query)
        let loginMsg = tools.Data.ConvertData<Login>(ctx.request.body)
        if(!loginMsg.username || !loginMsg.password)
        {
            responseBody.setResponseReason("username or password is empty");
            return RouterManager.Response(ctx, responseBody);
        }

        await LoginManager.checkLogin(loginMsg, responseBody);
        
        
        return RouterManager.Response(ctx, responseBody);


    })

    await router.post("/register", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let loginMsg = tools.Data.ConvertData<Login>(ctx.request.body)
        if(!loginMsg.username || !loginMsg.password)
        {
            // return RouterManager.Response(ctx, {code : 1101, reason : "username or password unexists"});
            responseBody.setResponseReason("username or password unexists");
            return RouterManager.Response(ctx, responseBody);
        }

        await LoginManager.register(loginMsg, responseBody);
        return RouterManager.Response(ctx, responseBody)

    })

    await router.post("/changePwd", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        let logingMsg = tools.Data.ConvertData<LoginChangeMsg>(ctx.request.body);
        if(!logingMsg.username || !logingMsg.password)
        {
            responseBody.setResponseReason("username or password unexists");
            return RouterManager.Response(ctx, responseBody);
        }

        if(!logingMsg.newPassword)
        {
            responseBody.setResponseReason("newPassword is empty");
            return RouterManager.Response(ctx, responseBody);
        }

        await LoginManager.changePassword(logingMsg, responseBody);
        
        return RouterManager.Response(ctx, responseBody);
    })

    await router.get("/getAllUser", async (ctx) =>
    {
        let responseBody = new ResponseBody();
        await LoginManager.getAllUser(responseBody);
        return RouterManager.Response(ctx, responseBody);
    })

    await router.get("/userInfo", async (ctx) =>
    {
        let query = ctx.request.query;
        let userId  = +(query.id as string);

        let responseBody = new ResponseBody();
        let user = await LoginManager.getUserInfo(userId);
        responseBody.setResponseData(user);
        return RouterManager.Response(ctx, responseBody);
    })

}

export type LoginChangeMsg = Login & {newPassword : string}