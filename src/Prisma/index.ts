import Application from "koa";
import {Login, Prisma, PrismaClient} from "@prisma/client";
import { tbDemo } from "@prisma/client";
import * as runtime from '@prisma/client/runtime/library';
import { ResponseBody } from "@/Router";

export type PrismaType = Omit<PrismaClient, runtime.ITXClientDenyList>
let prisma = new PrismaClient();

export default class PrismaManager
{
    public static getPrisma()
    {
        if(!prisma)
            prisma = new PrismaClient();

        return prisma;
    }

    public static async close()
    {
        await PrismaManager.getPrisma().$disconnect();
    }

    /**
     * 错误信息会被收集，如果提供了responseBody，就会被写回到ResponseBody中
     * @param callback 事务函数
     * @param responseBody 返回体的编辑，可选
     * @returns status : Boolean 如果是false，则事务出错，responseBody被置为丢出的信息
     */
    public static async transaction(
        callback : (prisma : PrismaType, responseBody? : ResponseBody) => Promise<any>,
        responseBody? : ResponseBody
    )
    {
        return PrismaManager.getPrisma().$transaction( async () =>
        {
            console.log("translation start")
            return await callback.bind(null, PrismaManager.getPrisma(), responseBody)()
        })
        .then(() =>
        {
            return true;
        })
        .catch((err) =>
        {
            console.log("translation error : ", err);
            responseBody?.setResponseReason(err.message);
            return false;
        })
        .finally(() =>
        {
            console.log("translation end")
        })
    }


    public static async execute<T = any>(sql : string) : Promise<T>
    {
        console.log("querySQL : ", sql)
        return await PrismaManager.getPrisma().$queryRawUnsafe<T>(sql);
    }

    public static async QueryFirst<T extends any | void = any> (sql : string)
    {
        let sqlResult =  await PrismaManager.getPrisma().$queryRawUnsafe<T>(sql);
        return sqlResult instanceof Array ? sqlResult[0] : sqlResult;
    }


}
