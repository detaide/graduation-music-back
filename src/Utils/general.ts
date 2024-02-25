import fs from "fs"
import path from "path"

export function PathLoad(dirPath : string)
{
    const files = fs.readdirSync(dirPath);

    if(!files.length)
        throw new Error(`Path ${dirPath} doesn't exist Files`)

    console.log("PathLoad : ", dirPath);

    files.forEach(async file =>
        {
            if(file === "index.ts")
            {
                return;
            }

            const filePath = path.join(dirPath, file)
            const func = await import(filePath)

            if(func)
            {
                for(let moduleName in func)
                {
                    await func[moduleName]();
                }
            }

        })
}

