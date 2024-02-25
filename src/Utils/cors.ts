import Application from "koa";

export function useCors(app : Application)
{
    app.use(async (ctx, next) =>
    {
        await next();
        ctx.set('Access-Control-Allow-Origin', '*');
    })
}