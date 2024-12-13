let jsonObject = null

// 경로를 입력받고 해당 값 찾기
function getValueFromPath(obj, path)
{
    // 경로 문자열을 "/"로 분리하고 빈 문자열 제거
    let keys = path.split("/").filter(key => key.length > 0)
    let result = obj

    for (let key of keys)
        {
        // 배열 인덱스를 확인하기 위한 정규 표현식
        let arrayMatch = key.match(/^(.+)\[(\d+)\]$/) // 예: birth[0]
        
        if (arrayMatch)
        {
            let arrayKey = arrayMatch[1]  // 배열의 키 (예: birth)
            let index = parseInt(arrayMatch[2], 10)  // 배열 인덱스 (예: 0)

            if (result && Array.isArray(result[arrayKey]))
            {
                result = result[arrayKey][index]  // 배열에서 인덱스에 해당하는 값
            }
            else
            {
                return undefined  // 해당 키에 배열이 없으면 undefined
            }
        }
        else
        {
            // 배열이 아닌 일반 객체 키에 접근
            if (result && key in result)
            {
                result = result[key]
            }
            else
            {
                return undefined  // 해당 키가 없으면 undefined
            }
        }
    }

    return result  // 경로 끝까지 찾으면 해당 값 반환
}

function loadGameNames()
{
    for (let i = 0; i < 10; ++i)
    {
        let rootHierarchy = `/info/participants[${i}]`

        let gameName = getValueFromPath(jsonObject, `${rootHierarchy}/riotIdGameName`)
        let tagLine = getValueFromPath(jsonObject, `${rootHierarchy}/riotIdTagline`)
        let fullName = `${gameName}#${tagLine}`

        document.getElementById(`riotId${i}`).value = fullName
    }
}

function clearNames()
{
    for (let i = 0; i < 10; ++i)
    {
        document.getElementById(`riotId${i}`).value = ""
    }
}

function loadValues(jsonRelPath)
{
    for (let i = 0; i < 10; ++i)
    {
        let rootHierarchy = `/info/participants[${i}]`
        let value = getValueFromPath(jsonObject, `${rootHierarchy}${jsonRelPath}`)

        document.getElementById(`value${i}`).value = value
    }
}

function clearValues()
{
    for (let i = 0; i < 10; ++i)
    {
        document.getElementById(`value${i}`).value = ""
    }
}

document.getElementById("input_json_file").addEventListener("change", function(fileUploadEventData) {
    let file = fileUploadEventData.target.files[0]

    if (file)
    {
        let reader = new FileReader();

        reader.onload = function(fileLoadEventData)
        {
            jsonObject = JSON.parse(fileLoadEventData.target.result)
            loadGameNames()
        }

        let msg = reader.readAsText(file)

        document.getElementById("property_name").disabled = false
    }
    else
    {
        document.getElementById("property_name").disabled = true
    }
})

document.getElementById("property_name").addEventListener("change", function(event) {
    let selectedValue = event.target.value

    if (selectedValue == "/")
    {
        clearValues()
    }
    else
    {
        loadValues(selectedValue)
    }
})

document.addEventListener("DOMContentLoaded", function() {

    let selectTag = document.getElementById("property_name")

    function appendOption(target, value)
    {
        let optionTag = document.createElement("option")
        optionTag.value = value
        optionTag.textContent = value
        target.appendChild(optionTag)
    }

    // NOTE: 특별한 목적이 있어서 반드시 포함해야 하는 속성입니다.
    appendOption(selectTag, "/")

    // NOTE:
    // 이 곳에 확인하고 싶은 속성을 추가할 수 있습니다.
    // 자세한 내용은 RIOT API Documentation의 ParticipantDto를 참조하세요.
    appendOption(selectTag, "/championName")
    appendOption(selectTag, "/lane")
    appendOption(selectTag, "/kills")
    appendOption(selectTag, "/deaths")
    appendOption(selectTag, "/assists")
    appendOption(selectTag, "/challenges/kda")
})
