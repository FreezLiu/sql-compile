const knex = require('knex')({
    client: 'mysql',
});

function compile(params) {
    let [...operator] = params
    let sql = knex;
    operator.map(op => {
        let op_str = Object.keys(op).pop()
        switch (op_str) {
            case 'select':
                sql = sql.select(op.select);
                break;
            case 'from':
                sql = sql.from(op.from);
                break;
            case 'where':
            case 'whereNot':
            case 'whereIn':
            case 'whereNull':
            case 'whereNotNull':
                sql = where(sql, op, op_str)
                break;
            case 'having':
                sql = sql.having(...op.having);
                break;
            case 'havingIn':
                sql = sql.havingIn(...op.havingIn);
                break;
            case 'havingNotIn':
                sql = sql.havingNotIn(...op.havingNotIn);
                break;
            case 'havingNull':
                sql = sql.havingNull(op.havingNull);
                break;
            case 'havingNotNull':
                sql = sql.havingNotNull(op.havingNotNull);
                break;
            case 'groupBy':
                sql = sql.groupBy(op.groupBy);
                break;
            case 'count':
            case 'max':
            case 'min':
            case 'avg':
            case 'sum':
                sql = sql[op_str](op[op_str]);
                break;
            case 'orderBy':
                sql = sql.orderBy(...op.orderBy);
                break;
            case 'limit':
                sql = sql.limit(op.limit);
                break;
            case 'offset':
                sql = sql.offset(op.offset);
                break;
            case 'join':
            case 'innerJoin':
            case 'leftJoin':
            case 'rightJoin':
            case 'fullOuterJoin':
                sql = join(sql, op[op_str], op_str);
                break;
            default:
                break;
        }
    })
    return sql.toString();
}

function where(sql, op, keys) {
    let method = op[keys].pop()
    if (method == "and") {
        sql = sql[keys](...op[keys]);
    }
    else if (method == "or") {
        fn = 'or' + keys.replace(/^w/, 'W');
        sql = sql[fn](...op[keys]);
    }
    return sql
}

function join(sql, op, keys) {
    return sql[keys](op.table, function() {
        for (let e of op.info) {
            switch (Object.keys(e).pop()) {
                case 'on':
                    this.on(...e.on)
                    break;
                case 'orOn':
                    this.orOn(...e.orOn)
                    break;
                case 'onIn':
                    this.onIn(...e.onIn);
                    break;
                case 'onNotIn':
                    this.onNotIn(...e.onNotIn);
                    break;
                default:
                    break;
            }
        }
    })
}

module.exports = compile;

