module.exports = {
    init: __init
}

const axios = require("axios")

const utility = require("../utility.js")

function __init(app)
{
    app.post("/call_api", __post_callApi)
}

function __post_callApi(req, res)
{
    res.sendFile(utility.getHtmlPath("./index.html"))

    axios.request()
}