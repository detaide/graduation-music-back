import PrismaManager from "@/Prisma";
import { PrismaClient } from "@prisma/client";

let prisma : PrismaClient = PrismaManager.getPrisma();

async function getAllTbDemo()
{
    return await prisma.tbDemo.findMany()
}

export default {
    getAllTbDemo
}