import React from "react"
import ViewResults from "./viewResults"

export function Documents(props)
{
    if(props.status >= 2)
    {
        return <ViewResults></ViewResults>
    }
}