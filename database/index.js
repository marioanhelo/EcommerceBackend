const {Pool} = require("pg")

const connection = new Pool({
    host:"babar.db.elephantsql.com",
    user:"coeqarop",
    password:"5BDyXw_rGTtHSw35BBsXCRTq5tp2Gwo9",
    database:"coeqarop",
    port:"5432"
})


module.exports = connection