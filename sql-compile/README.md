
---
## sql-compile
基于package: [knex.js](https://knexjs.org/) 的sql生成工具。针对mysql，通过解析对象参数直接产生sql。

安装：
```sh
$ npm install sql-compile
```
使用：
```js
const compile = require("sql-compile");
let params = [
    { select: ["id1", "id2"] },
    { select: { by: "name"} },
    { from: "user" },
    { where: ["id", ">=", 10, "and"] }, //whereNot
    { whereIn: ["id", [1, 2, 3], "or"] },//whereNotIn
]
let sql = compile(params)
//select `id1`, `id2`, `name` as `by` from `user` where `id` >= 10 or `id` in (1, 2, 3)
```

其他标签：
按照组件自由组合的方式生成sql
```js
[
    {select :"*"}
    { select: ["id1", "id2"] },
    { select: { abc: "name", df: "id1" } },
    { from: "user" },
    { where: ["id", ">=", 10, "or"] }, //whereNot
    { whereIn: ["id", [1, 2, 3], "and"] },//whereNotIn
    { whereNull: ["id", "and"] },          //whereNotNull
    { groupBy: "name" },
    { orderBy: ["id", "desc"] },//asc
    { having: ["id1", "=", 23] },
    { havingIn: ["id", [1, 2, 3]] },  //havingNotIn
    { havingNull: "id" },  //havingNotNull
    { sum: "id1" },           //count、sum、max、min、avg
    { sum: { id: "id1" } },
    { limit: "2" },
    { offset: 4 },
    { where: ["i", "<", "10", "and"] },
    { limit: 1 },
    { join: { table: "info", info: [{ on: ["user.id", ">", "info.id"] }, { orOn: ["user.id", "<", "info.id"] }] } },//onIn:["id", [1, 2, 3]],onNotIn:["id", [1, 2, 3]]
]
```


        
        