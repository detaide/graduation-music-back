import Application from "koa";

async function useLog(app : Application)
{
    app.use(async (ctx, next) =>
    {
        await next();
        let rt = ctx.response.get("X-Response-Time")
        Log(`${ctx.method} - ${ctx.url} - ${rt}`);
    })
}

function Log(logMsg : string)
{
    console.log(logMsg);
}

export default class Loging{
    private static RESET = '\x1b[0m';
    private static RED = '\x1b[31m';
    private static GREEN = '\x1b[32m';
    private static YELLOW = '\x1b[33m';
    private static BLUE = '\x1b[34m';
    private static MAGENTA = '\x1b[35m';

    public static Error(msg : string)
    {
        console.log(`${this.RED} ${msg} ${this.RED}`);
    }

    public static Warn(msg : string)
    {
        console.log(`${this.YELLOW} ${msg} ${this.YELLOW}`);
    }

    public static Info(msg : string)
    {
        console.log(`${this.BLUE} ${msg} ${this.BLUE}`);
    }

    public static Success(msg : string)
    {
        console.log(`${this.GREEN} ${msg} ${this.GREEN}`);
    }
    
}

export {useLog}