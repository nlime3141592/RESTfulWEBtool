function OnButtonClick_DeleteHeader(event)
{
    let btn = event.target

    let tr = btn.closest("tr")
    let table = tr.closest("table")

    table.deleteRow(tr.rowIndex)
}

function CreateGUI_VariableRequest()
{
    let row = document.createElement("tr")
    let column0 = document.createElement("td")
    let column1 = document.createElement("td")
    let column2 = document.createElement("td")

    let inputHeader = document.createElement("input")
    inputHeader.classList.add("header-request")
    inputHeader.classList.add("width-per100")
    inputHeader.setAttribute("type", "text")
    inputHeader.setAttribute("placeholder", "variable name here...")

    let inputValue = document.createElement("input")
    inputValue.classList.add("header-request")
    inputValue.classList.add("width-per100")
    inputValue.setAttribute("type", "text")
    inputValue.setAttribute("placeholder", "value here...")

    let btnDelete = document.createElement("button")
    btnDelete.classList.add("btn_request_delete_header")
    btnDelete.onclick = OnButtonClick_DeleteHeader
    btnDelete.innerText = "삭제"

    column0.appendChild(inputHeader)
    column1.appendChild(inputValue)
    column2.appendChild(btnDelete)

    row.appendChild(column0)
    row.appendChild(column1)
    row.appendChild(column2)

    return row
}

function CreateGUI_HeaderRequest()
{
    let row = document.createElement("tr")
    let column0 = document.createElement("td")
    let column1 = document.createElement("td")
    let column2 = document.createElement("td")

    let inputHeader = document.createElement("input")
    inputHeader.classList.add("header-request")
    inputHeader.classList.add("width-per100")
    inputHeader.setAttribute("type", "text")
    inputHeader.setAttribute("placeholder", "header name here...")

    let inputValue = document.createElement("input")
    inputValue.classList.add("header-request")
    inputValue.classList.add("width-per100")
    inputValue.setAttribute("type", "text")
    inputValue.setAttribute("placeholder", "value here...")

    let btnDelete = document.createElement("button")
    btnDelete.classList.add("btn_request_delete_header")
    btnDelete.onclick = OnButtonClick_DeleteHeader
    btnDelete.innerText = "삭제"

    column0.appendChild(inputHeader)
    column1.appendChild(inputValue)
    column2.appendChild(btnDelete)

    row.appendChild(column0)
    row.appendChild(column1)
    row.appendChild(column2)

    return row
}

function CreateGUI_HeaderResponse()
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


function OnButtonClick_AddVariable()
{
    let table = document.getElementById("table_request_variable")

    table.appendChild(CreateGUI_VariableRequest())
}

function OnButtonClick_AddHeader()
{
    let table = document.getElementById("table_request_header")

    table.appendChild(CreateGUI_HeaderRequest())
}

document.getElementById("btn_request_add_variable").onclick = OnButtonClick_AddVariable
document.getElementById("btn_request_add_header").onclick = OnButtonClick_AddHeader