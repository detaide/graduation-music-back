

// const modules = import.meta.glob('./**/*.ts')
// let api : any = {}
// async function loadModule() {
//     for (const [path, module] of Object.entries(modules)) {
//       const list = await module() as any
//       for (const key in list) {
//         api[key] = list[key]
//       }
//     }
//   }
// await loadModule()
// export  {api}


// 丢失泛型
// import fs from "fs";
// import path from "path";

// let tools : {[key : string] : any} = {};

// export async function loadModules()
// {
//     const files = await fs.readdirSync(__dirname);
//     files.forEach(async file =>
//     {
//         loadModule(path.join(__dirname, file)); 
//     })
// }

// async function loadModule(modulePath : string) 
// {
//     if(fs.statSync(modulePath).isDirectory())
//     {
//         fs.readdirSync(modulePath).forEach(async (file) =>
//         {
//             return await loadModule(path.join(modulePath, file));
//         })
//     }

//     if(path.extname(modulePath) === ".ts")
//     {
//         const module = await import(modulePath);

//         for(const key of module)
//         {
//             tools[key] = <T>(...args : any) => module[key] as any as T;
//         }
//     }
// }

// loadModules()

// export {
//     tools
// }

import * as general from "./general";
import * as Time from "./Time";
import * as Data from "./Data"
import * as Ctypto from "./Crypto"

export default {
    general,
    Time,
    Data,
    Ctypto
}