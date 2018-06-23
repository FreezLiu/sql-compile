const compile = require('./index');
let params = [
    { select: ["id1", "id2"] },
    { select: { abc: "name", df: "id1" } },
    { from: "user" },
    { where: ["id", ">=", 10, "or"] }, //whereNot
    { whereIn: ["id", [1, 2, 3], "and"] },//whereNotIn
    { whereNull: ["id", "and"] },          //whereNotNull
    { groupBy: "name" },
    { orderBy: ["id", "desc"] },
    { having: ["id1", "=", 23] },
    { havingIn: ["id", [1, 2, 3]] },  //havingNotIn
    { havingNull: "id" },  //havingNotNull
    { sum: "id1" },           //count、sum、max、min、avg
    { sum: { id: "id1" } },
    { limit: "2" },
    { offset: 4 },
    { where: ["i", "<", "10", "and"] },
    { limit: 1 },
    { join: { table: "info", info: [{ on: ["user.id", ">", "info.id"] }, { orOn: ["user.id", "<", "info.id"] }] } },
]

console.log(compile(params))