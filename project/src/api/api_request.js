module.exports = {
    init: __init
}

const axios = require("axios")

const utility = require("../utility.js")

function __init(app)
{
    app.get("/call_api", __get_callApi)
}

async function __get_callApi(req, res)
{
    let data = req.headers

    // console.log(JSON.stringify(data))

    let url = data["requrl"]
    let method = data["reqmethod"]
    let headers = data["reqheaders"]

    // NOTE: Response from API Server.
    let response = await axios.request(url, {
        method: method,
        headers: JSON.parse(headers)
    })

    // TEST: Logging for data is valid.
    // console.log(JSON.stringify(response.status))
    // console.log(JSON.stringify(response.statusText))
    // console.log(response.data)

    let responseBody = {
        "status": response.status,
        "statusText": response.statusText,
        "data": JSON.stringify(response.data)
    }

    let responseBodyStr = JSON.stringify(responseBody)

    // TEST: Logging for data is valid.
    // console.log(responseBodyStr)

    await res.json(responseBody)
}