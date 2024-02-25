import PrismaManager, { PrismaType } from "@/Prisma";
import { Login, Prisma, PrismaClient } from "@prisma/client";
import Time from "@/Utils/Time"
import { ParameterizedContext } from "koa";
import Loging from "@/Log/log";
import { ResponseBody } from "@/Router";
import { LoginChangeMsg } from "@/Router/Login";
import Utils from "@/Utils";

let loginProxy : Prisma.LoginDelegate = PrismaManager.getPrisma().login;


async function checkLogin(loginMsg : Login, responseBody : ResponseBody) {
    let status = await PrismaManager.transaction(async (prisma) =>
    {
        let password = Utils.Ctypto.decrypted(loginMsg.password);
        console.log('decryptopwd : ', password)
        let loginItem = await prisma.login.findFirst({
            where : {
                username : loginMsg.username,
            }
        })

        if(!loginItem)
        {
            throw new Error(`checkLogin Error : ${loginMsg.username}`)
        }
        let sqlPassword = Utils.Ctypto.decrypted(loginItem.password);
        // Todo : 关闭这行输出，忘记密码再点击这里显示
        console.log("sqlPass : ", sqlPassword)
        if(sqlPassword !== password)
        {
            throw new Error("checkLogin Error, password Error");
        }

        let currTime = Time.currTime();
        await prisma.login.update(
            {
                data : {
                    login_time : currTime
                },
                where : {
                    username : loginMsg.username
                }
            }
        )
        
        responseBody.setResponseData({
            user_id : loginItem.id,
            text : "heckLogin Success"
        })

    }, responseBody);

    // if(status)
    //     return  responseBody.setResponseData("checkLogin Success");

}

async function register(loginMsg : Login, responseBody : ResponseBody){

    let status = await PrismaManager.transaction( async (prisma) =>
    {
        let userItem = await userExist(prisma, loginMsg.username);

        if(userItem)
        {
            throw new Error(`username "${loginMsg.username}" has exist`);
        }

        let currTime = Time.currTime();

        let loginItem = await prisma.login.create(
            {
                data : {
                    username : loginMsg.username,
                    password : loginMsg.password,
                    register_time : currTime,
                    update_time : currTime,
                    login_time : currTime
                }
            }
        )

        if(!loginItem)
        {
            throw new Error("create user fail");
        }
    })

    if(status)
        return responseBody.setResponseData("create user success");

}

async function userExist(prisma : PrismaType, username:string) {
    return await prisma.login.findFirst({
        where : {
            username
        }
    })
}

async function getAllUser(responseBody : ResponseBody) {
    let allUser = await loginProxy.findMany();
    return responseBody.setResponseData(allUser);
}

async function bringPasswordByUserId(prisma : PrismaType, userId : number) {
    return await prisma.login.findFirst({
        where : {
            id : userId
        }
    })
}

async function changePassword(loginchangeMsg :  LoginChangeMsg, responseBody : ResponseBody) {
    let oldPassword =  Utils.Ctypto.decrypted(loginchangeMsg.password);
    let newPassword = Utils.Ctypto.decrypted(loginchangeMsg.newPassword);
    let status = await PrismaManager.transaction( async (prisma) =>
    {
        let userInfo =  await bringPasswordByUserId(prisma, loginchangeMsg.id);
        let dePwd = Utils.Ctypto.decrypted(userInfo.password);
        if(oldPassword === dePwd)
        {
            let currTime = Time.currTime();
            await prisma.login.update(
            {
                data : {
                    password : loginchangeMsg.newPassword,
                    update_time : currTime
                },
                where : {
                    id : loginchangeMsg.id
                }
            })
        }
        else{
            throw new Error("原密码错误");
        }
    })

    if(status)
        return responseBody.setResponseData("changePwd Success")

}

export async function getUserInfo(userId : number) {
    return await loginProxy.findFirst({
        where : {
            id : userId
        }
    })
}

export default
{
    checkLogin,
    register,
    getAllUser,
    changePassword,
    getUserInfo
}