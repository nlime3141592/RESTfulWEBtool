module.exports = {
    init: __init
}

const axios = require("axios")

const utility = require("../utility.js")

function __init(app)
{
    app.post("/call_api", __post_callApi)
}

async function __post_callApi(req, res)
{
    let data = req.body

    let url = data.url
    let method = data.method
    let headers = JSON.parse(data.headers)

    let response = await axios.request(url, {
        method: method,
        headers: headers
    })

    json = JSON.stringify(response.data)
    console.log(json)

    await res.json(json)
}