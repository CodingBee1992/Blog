import { use } from "react"
import { SinglePostContext } from "../slices/createPostContext"



export const usePostContext = () =>{
    const context = use(SinglePostContext)
    if(!context){
        throw new Error("Must be use with a ExampleProvider")
    }

    return context
}