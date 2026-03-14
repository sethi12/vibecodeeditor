import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/playground/lib/path-to-json";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { NextRequest } from "next/server";
import { templatePaths } from "@/lib/template";
import { error } from "console";

// Helper function to ensure valid JSON
function validateJsonStructure(data: unknown): boolean {
  try {
    JSON.parse(JSON.stringify(data)); // Ensures it's serializable
    return true;
  } catch (error) {
    console.error("Invalid JSON structure:", error);
    return false;
  }
}
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    if(!id){
        return Response.json({error:"Missing playground ID"},{status:400})
    }
    const playground = await db.playground.findUnique({
        where:{
            id
        }
    })
    if(!playground){
          return Response.json({error:"Playgrond not found "},{status:400})
    }
    const templatekey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templatekey];
    if(!templatePath){
         return Response.json({error:"INVALID Template Path"},{status:404})
    }

    try {
            const inputpath = path.join(process.cwd(),templatePath)
            const outputFile = path.join(process.cwd(),`output/${templatekey}.json`)
            await saveTemplateStructureToJson(inputpath,outputFile);
            const result = await readTemplateStructureFromJson(outputFile)
            if(!validateJsonStructure(result.items)){
                return Response.json({error:"Inavlid Json Structure"},{status:500})
            }

            await fs.unlink(outputFile);
            return Response.json({success:true,templateJson:result},{status:200})
    } catch (error) {
        console.error("Error Generating template Json:",error);
        return Response.json({error:"Failed to generate template "},{status:500})

    }
}