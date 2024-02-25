这是一个简易JavaScript Server，用于开发一个简易的服务端

技术栈使用typescript、node.js、prisma、koa

并未做更具体的ORM，后续可能会进行更新

文件路径

```
--Prisma

	--schema.preisma		//数据库映射

--Src
	--Prisma
		--index.ts			//提供prisma对象
	--Router
		--index.ts			// 加载本文件夹下的所有导出函数(当前尚未写嵌套查询，因此不支持子文件夹内导出)
		--xxxx.ts			//提供路由函数，其中每一个都会被加载
	--Server
		--index.ts
		--xxx.ts			// 提供实际的路由处理函数
```

运行
```
npm install
npx prisma generate
npm run start
```
