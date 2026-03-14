"use server";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
// @ts-ignore
import {Templates} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createplayground = async(data:{title:string;template:Templates;
    description:string;

})=>{
   
    const {title,template,description}= data;
    const user = await currentUser();
    try {
    const playground =     await db.playground.create({
            data:{
                title,
                template,
                description,
                userId:user?.id || ""
            }
        });
        return playground;

    } catch (error) {
        console.log(error);
        return null;
    }
}  


export const getallplaygroundsofUser = async()=>{
    const user = await currentUser();
    try {
        const playgrounds = await db.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user:true,
                Starmark:{
                    where:{
                        userId:user?.id 
                    },
                    select:{
                        ismarked:true,
                    }
                }
            }
        });
        return playgrounds;
    } catch (error) {
            console.log(error);
            return null;
    }
}

export const deleteprojectbyid = async(id:string)=>{
    try {
            await db.playground.delete({
                where:{
                    id
                }
            }); 
            revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
    }

}


export const Editprojectbyid = async(id:string,data:{title?:string;description?:string})=>{
    try {
        await db.playground.update({
            where:{
                id
            },
           data:data
        });
        revalidatePath("/dashboard");       
    } catch (error) {
        
    }
}

export const duplicateprojectbyid = async(id:string)=>{
    try{
            const orignalplayground = await db.playground.findUnique({
                where:{
                    id
                }
            });
            if(!orignalplayground){throw new Error("Original playground not found");}
            const duplicatedplayground = await db.playground.create({
                data:{
                    title:`${orignalplayground.title} (Copy)`,
                    description:orignalplayground.description,
                    template:orignalplayground.template,
                    userId:orignalplayground.userId
                }
            });
            revalidatePath("/dashboard");   
            return duplicatedplayground;
           
    }catch(error){
        console.log(error);
        return null;
    }
}