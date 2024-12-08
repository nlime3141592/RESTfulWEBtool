function IsInCharset(char)
{
    let ascii = char.charCodeAt(0)

    if (ascii >= 0x41 && ascii <= 0x5a)
        return true
    else if (ascii >= 0x61 && ascii <= 0x7a)
        return true
    else if (ascii >= 0x30 && ascii <= 0x39)
        return true
    else if (ascii == 0x2d || ascii == 0x2e || ascii == 0x5f || ascii == 0x7e || ascii == 0x20)
        return true
    else
        return false
}

function ParseString(token)
{
    if (token.length == 0)
        return ""

    for (let i = 0; i < token.length; ++i)
    {
        if (!IsInCharset(token[i]))
            return ""
    }

    return token
}

function ParseVariable(token, variableObject)
{
    let string = ParseString(token)

    if (string == "")
        return ""

    let value = variableObject[string]

    if (value.length == 0)
        return ""

    return value
}

function ParseValue(token, variableObject)
{
    if (token.length == 0)
        return ""

    if (token[0] == "{" && token[token.length - 1] == "}")
        return ParseVariable(token.substring(1, token.length - 1), variableObject)
    else
        return ParseString(token)
}

function ParseURI(uri, variableObject)
{
    let tokens = uri.split("/")
    let fullUri = ""

    if (tokens[0].length > 0 || tokens[tokens.length - 1].length == 0)
        return ""

    for (let i = 1; i < tokens.length; ++i)
    {
        value = ParseValue(tokens[i], variableObject)

        if (value == "")
            return ""
        else
            fullUri += "/" + value
    }

    return fullUri
}