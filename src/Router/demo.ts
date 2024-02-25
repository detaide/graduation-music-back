import PrismaManager from "@/Prisma";
import RouterManager from ".";
import { Login } from "@prisma/client";

export function DemoPath()
{
    let router = RouterManager.getRouter();

    router.get("/", (ctx) =>
    {
        ctx.body = "Hello World"
    })

    router.get("/demo", (ctx) =>
    {
        ctx.body = " this is a demo";
    })

    router.get("/queryRow", async (ctx) =>
    {
        let ret = await PrismaManager.QueryFirst<Login>(`select * from login`);
        ctx.body = ret;
    })
}