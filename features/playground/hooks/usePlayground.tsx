import { useState,useEffect,useCallback } from "react";
import {toast} from "sonner"
import { TemplateFolder } from "../lib/path-to-json";
import { getplaygroundbyid, SaveUpdatedCode } from "../actions";


interface Playgroundata{
    id:string,
    title?:string,
    [key:string]:any

}

interface Useplaygroundreturn {
    playgroundData:Playgroundata|null,
    templateData:TemplateFolder|null,
    isLoading:boolean,
    error:string|null,
    loadplayground:()=>Promise<void>,
    savetemplatedata:(data:TemplateFolder)=>Promise<void>

}

export const usePlayground=(id:string):Useplaygroundreturn=>{
    const [playgroundData,setPlaygroundData]= useState<Playgroundata|null>(null);
    const [templateData,setTemplateData] = useState<TemplateFolder|null>(null);
    const [isLoading,setisLoading] = useState(false);
    const [error,seterror]= useState<string|null>(null);

    const loadplayground = useCallback(async()=>{
            if(!id)return;
            try {
                setisLoading(true)
                seterror(null)
                const data = await getplaygroundbyid(id);
                //@ts-ignore
                setPlaygroundData(data)
                const rawcontent = data?.templateFiles?.[0]?.content;
                if (typeof rawcontent === "string") {
                    const parsedcontent = JSON.parse(rawcontent);
                    setTemplateData(parsedcontent);
                    toast.success("Playground Loaded...")
                    return;
                }

                const res = await fetch(`/api/template/${id}`);
                if(!res.ok) throw new Error(`Failed to load Template : ${res.status}`)

                const templateres = await res.json();
                if(templateres.templateJson && Array.isArray(templateres.templateJson)){
                    setTemplateData({
                        folderName:"Root",
                        items:templateres.templateJson
                    })
                }else{
                    setTemplateData(templateres.templateJson ||{
                        folderName:"Root",
                        items:[]
                    })
                }
                toast.success("Template Loaded successfully")
            } catch (error) {
                    console.error(error)
                    seterror("Failed to Load Template")
                    toast.error("Failed to Load playground data ")
            }finally{
                setisLoading(false)
            }
    },[id]);
const savetemplatedata = useCallback(async(data:TemplateFolder)=>{
    try {
        await SaveUpdatedCode(id,data)
        setTemplateData(data)
        toast.success("Changes saved successfully")
    } catch (error) {
            console.error(error);
            toast.error("Failed to Save Changes")
            throw error
    }

},[])
    useEffect(()=>{
        loadplayground()
    },[loadplayground])

    return{
        playgroundData,
        templateData,
        isLoading,
        error,
        loadplayground,
        savetemplatedata
    }
};