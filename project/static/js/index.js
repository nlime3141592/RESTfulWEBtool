function OnButtonClick_DeleteHeader(event)
{
    let btn = event.target

    let tr = btn.closest("tr")
    let table = tr.closest("table")

    table.deleteRow(tr.rowIndex)
}

function CreateGUI_RequestTableRow()
{
    let row = document.createElement("tr")
    row.setAttribute("id", "request_table_row")
    let column0 = document.createElement("td")
    let column1 = document.createElement("td")
    let column2 = document.createElement("td")

    let inputName = document.createElement("input")
    inputName.classList.add("table-name")
    inputName.classList.add("width-per100")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("placeholder", "name here...")
    inputName.setAttribute("id", "name")

    let inputValue = document.createElement("input")
    inputValue.classList.add("table-value")
    inputValue.classList.add("width-per100")
    inputValue.setAttribute("type", "text")
    inputValue.setAttribute("placeholder", "value here...")
    inputValue.setAttribute("id", "value")

    let btnDelete = document.createElement("button")
    btnDelete.classList.add("btn_delete_row")
    btnDelete.onclick = OnButtonClick_DeleteHeader
    btnDelete.innerText = "삭제"

    column0.appendChild(inputName)
    column1.appendChild(inputValue)
    column2.appendChild(btnDelete)

    row.appendChild(column0)
    row.appendChild(column1)
    row.appendChild(column2)

    return row
}

function CreateGUI_ResponseTableRow()
{
    let row = document.createElement("tr")
    let column0 = document.createElement("td")
    let column1 = document.createElement("td")

    let inputHeader = document.createElement("input")
    inputHeader.classList.add("header-response")
    inputHeader.classList.add("width-per100")
    inputHeader.setAttribute("type", "text")
    inputHeader.readOnly = true

    let inputValue = document.createElement("input")
    inputValue.classList.add("header-response")
    inputValue.classList.add("width-per100")
    inputValue.setAttribute("type", "text")
    inputValue.readOnly = true

    column0.appendChild(inputHeader)
    column1.appendChild(inputValue)

    row.appendChild(column0)
    row.appendChild(column1)

    return row
}

function CreatePathParameter()
{
    let table = document.getElementById("table_request_path_param")
    let rpath = document.getElementById("input_res").value
    let params = {}
    let fullPath = ""

    // NOTE: Algorithm #1, Create Parameter Table.
    table.querySelectorAll("#request_table_row").forEach((param) => {
        let name = param.querySelector("#name").value
        let value = param.querySelector("#value").value

        params[name] = value
    })

    // NOTE: Algorithm #2, Parsing Resource Path.
    fullPath = ParseURI(rpath, params)

    return fullPath
}

function CreateQueryParameter()
{
    let table = document.getElementById("table_request_query_param")
    let params = ""
    let cnt_param = 0

    table.querySelectorAll("#request_table_row").forEach((param) => {
        let name = param.querySelector("#name").value
        let value = param.querySelector("#value").value

        if (cnt_param++ == 0)
            params += `?${name}=${value}`
        else
            params += `&${name}=${value}`
    })

    return params
}

function CreateRequestUrl()
{
    let url = document.getElementById("input_url").value

    let ppath = CreatePathParameter()
    let qpath = CreateQueryParameter()

    let fullUrl = url + ppath + qpath

    return fullUrl
}

function CreateRequestMethod()
{
    let method = document.getElementById("method").value

    return method
}

function CreateRequestHeaders()
{
    let table = document.getElementById("table_request_header")
    let headers = {}

    table.querySelectorAll("#request_table_row").forEach((header) => {
        let name = header.querySelector("#name").value
        let value = header.querySelector("#value").value

        headers[name] = value
    })

    let json = JSON.stringify(headers)

    return json
}

async function OnButtonClick_SendRequest()
{
    let response = await fetch("/call_api", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "requrl": CreateRequestUrl(),
            "reqmethod": CreateRequestMethod(),
            "reqheaders": CreateRequestHeaders()
        }
    })

    let responseBody = await response.json()

    let status = responseBody["status"]
    let statusText = responseBody["statusText"]
    document.getElementById("text_status_code").innerText = `${status} ${statusText}`

    function escapeHtml(string) {
        return string
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    let responseBodyStr = JSON.stringify(JSON.parse(responseBody["data"]), null, 2)
    document.getElementById("body_response").innerHTML = `<pre>${escapeHtml(responseBodyStr)}</pre>`
}

function OnButtonClick_AddTableRow(event)
{
    let table = event.target.closest("table")

    table.appendChild(CreateGUI_RequestTableRow())
}

document.querySelectorAll(".btn_add_table_row").forEach((btn) => {
    btn.onclick = OnButtonClick_AddTableRow
})
document.getElementById("btn_request_send").onclick = OnButtonClick_SendRequest