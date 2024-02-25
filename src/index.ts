import Koa from "koa";
import {useLog} from "@/Log/log"
import {useResponseHandler, useRouter} from "@/Router/index"
import "@/Global/TypeSupport"
import cors from "koa2-cors"
// import { useCors } from "./Utils/cors";

async function Bootstrap() {
    const app = new Koa();


    await useLog(app);

    await useRouter(app);

    await useResponseHandler(app)

    // await useCors(app)

    await app.use(cors())

    await app.listen(12011, () =>
    {
        console.log("12011 port listening...")
    })

}


Bootstrap();





