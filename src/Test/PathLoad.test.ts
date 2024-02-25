import PrismaManager from "@/Prisma"
// import { PathLoad } from "@/Utils/index"
import  tools  from "@/Utils"
import {describe, expect, test} from "@jest/globals"
import path from "path"
// describe("sum a + b = c", () =>
// {
//     test("first Test", () =>
//     {
//         expect(sum(1,2)).toBe(3)
//     })
// })

// describe("PathLoad", () =>
// {
//     test("src", () =>
//     {
//         PathLoad(path.resolve(__dirname))
//     })
// })

// describe("QueryRow", () =>
// {
//     test("execute", async () =>
//     {
//         let ret = await PrismaManager.execute(`select * from login`);
//         console.log(ret)
//     })
// })


describe("loadModule", () =>
{
    test("module", async () =>
    {
        console.log(tools.Data.ConvertData<number>(12))
    })
})