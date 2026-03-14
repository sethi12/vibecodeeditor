// import React, { useState } from "react";
// import {
//   ChevronRight,
//   File,
//   Folder,
//   Plus,
//   FilePlus,
//   FolderPlus,
//   MoreHorizontal,
//   Trash2,
//   Edit3,
// } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupAction,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogDescription,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogAction,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// interface TemplateFile {
//   filename: string;
//   fileExtension: string;
//   content: string;
// }
// interface TemplateFolder {
//   folderName: string;
//   items: (TemplateFile | TemplateFolder)[];
// }

// type TemplateItem = TemplateFile | TemplateFolder;
// interface TemplateNodeProps {
//   item: TemplateItem;
//   onFileSelect?: (file: TemplateFile) => void;
//   SelectedFile?: TemplateFile;
//   level: number;
//   path?: string;
//   title?: string;
//   onAddFile?: (file: TemplateFile, parentPath: string) => void;
//   onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
//   onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
//   onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
//   onRenameFile?: (
//     file: TemplateFile,
//     newFilename: string,
//     newExtension: string,
//     parentPath: string,
//   ) => void;
//   onRenameFolder?: (
//     folder: TemplateFolder,
//     newFolderName: string,
//     parentPath: string,
//   ) => void;
// }
// const TemplateNode = ({
//   item,
//   level,
//   path = "",
//   onAddFile,
//   onAddFolder,
//   onDeleteFile,
//   onDeleteFolder,
//   onFileSelect,
//   onRenameFile,
//   onRenameFolder,
//   SelectedFile,
//   title,
// }: TemplateNodeProps) => {
//   const isValidItem = item && typeof item === "object";
//   const isFolder = isValidItem && "folderName" in item;
//   const [isOpen, setisOpen] = useState(level > 2);

//   if (!isValidItem) return null;
//   if (!isFolder) {
//     const file = item as TemplateFile;
//     const fileName = `${file.filename}.${file.fileExtension}`;
//     return (
//       <SidebarMenuItem>
//         <div className="flex items-center group">
//           <SidebarMenuButton className="flex flex-1">
//             <File className="h-4 w-4 mr-2 shrink-0 " />
//             {fileName}
//           </SidebarMenuButton>

//           <DropdownMenu>

//             <DropdownMenuTrigger asChild>

//               <Button
//                 variant={"ghost"}
//                 size={"icon"}
//                 className="h-6 w-6 opacity-0
//  group-hover:opacity-100 transition-opacity"
//               >
//                 <MoreHorizontal className="h-3 w-3 "/>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//                <DropdownMenuItem onClick={()=>{}}>
//                  <Edit3 className="h-4 w-4 mr-2"/>
//                  Rename
//                </DropdownMenuItem>
//                <DropdownMenuSeparator/>
//                  <DropdownMenuItem onClick={()=>{}} className="text-destructive">
//                  <Trash2 className="h-4 w-4 mr-2"/>
//                  Delete
//                </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </SidebarMenuItem>
//     );
//   }
//  else{
//     const folder = item as TemplateFolder;
//     const folderName = folder.folderName
//     const currentPath = path ? `${path}/${folderName}` : folderName

//     return(
//         <SidebarMenuItem>
//             <Collapsible open={isOpen} onOpenChange={setisOpen} className="group/collapsible 
//             [&[data-state=open]>div>button>svg:first-child]:rotate-90"> 
//             <div className="flex items-center group">
//                 <CollapsibleTrigger asChild>
//                 <SidebarMenuButton className="flex-1">
//                     <ChevronRight className="transition-transform"/>
//                     <Folder className="h-4 w-4 mr-2 shrink-0"/>
//                     <span>{folderName}</span>
//                 </SidebarMenuButton>
//                 </CollapsibleTrigger>

//                <DropdownMenu>

//             <DropdownMenuTrigger asChild>

//               <Button
//                 variant={"ghost"}
//                 size={"icon"}
//                 className="h-6 w-6 opacity-0
//  group-hover:opacity-100 transition-opacity"
//               >
//                 <MoreHorizontal className="h-3 w-3 "/>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//                  <DropdownMenuItem onClick={()=>{}}>
//                  <FilePlus className="h-4 w-4 mr-2"/>
//                        New File
//                </DropdownMenuItem>
//                <DropdownMenuSeparator/>
//                    <DropdownMenuItem onClick={()=>{}}>
//                  <FolderPlus className="h-4 w-4 mr-2"/>
//                          New Folder
//                </DropdownMenuItem>
//                <DropdownMenuItem onClick={()=>{}}>
//                  <Edit3 className="h-4 w-4 mr-2"/>
//                  Rename
//                </DropdownMenuItem>
//                <DropdownMenuSeparator/>
//                  <DropdownMenuItem onClick={()=>{}} className="text-destructive">
//                  <Trash2 className="h-4 w-4 mr-2"/>
//                  Delete
//                </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//             </div>
//             <CollapsibleContent>
//                 <SidebarMenuSub>
//                     {folder.items.map((childItem,index)=>(
//                         <TemplateNode
//                                   key={index}
//                                   item={childItem}
//                                   onFileSelect={onFileSelect}
//                                   SelectedFile={SelectedFile}
//                                   onAddFile={onAddFile}
//                                   onAddFolder={onAddFolder}
//                                   onDeleteFile={onDeleteFile}
//                                   onRenameFile={onRenameFile}
//                                   onRenameFolder={onRenameFolder}
//                                   onDeleteFolder={onDeleteFolder}
//                                   level={level+1}
//                                   path={currentPath}
//                                 />
//                     ))}
//                 </SidebarMenuSub>
//             </CollapsibleContent>
//             </Collapsible>

//         </SidebarMenuItem>
//     )
//  }
// };

// export default TemplateNode;

"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  File,
  Folder,
  Plus,
  FilePlus,
  FolderPlus,
  MoreHorizontal,
  Trash2,
  Edit3,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewFileDialog, NewFolderDialog, RenameFileDialog, RenameFolderDialog } from "./template-file-tree";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDescription } from "@/components/ui/alert 2";

interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}
interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}

type TemplateItem = TemplateFile | TemplateFolder;

interface TemplateNodeProps {
  item: TemplateItem;
  onFileSelect?: (file: TemplateFile) => void;
  SelectedFile?: TemplateFile;
  level: number;
  path?: string;
  title?: string;
  onAddFile?: (file: TemplateFile, parentPath: string) => void;
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    newExtension: string,
    parentPath: string
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string
  ) => void;
}

const TemplateNode = ({
  item,
  level,
  path = "",
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onFileSelect,
  onRenameFile,
  onRenameFolder,
  SelectedFile,
  title,
}: TemplateNodeProps) => {
  const isValidItem = item && typeof item === "object";
  const isFolder = isValidItem && "folderName" in item;
  const [isOpen, setisOpen] = useState(level > 2);
  const [isNewFileDialogOpen,setisNewFileDialogOpen]= useState(false)
  const [isNewFolderDialogOpen,setisNewFolderDialogOpen]= useState(false)
  const [isRenameDialogOpen,setisRenameDialogOpen] = useState(false)
  const [isDeletedDialogOpen,setisDeletedDialogOpen] = useState(false)
  if (!isValidItem) return null;

  const indent = level * 12; // modern subtle indentation

  if (!isFolder) {
    const file = item as TemplateFile;
    const fileName = `${file.filename}.${file.fileExtension}`;
    const isSelected =
      SelectedFile && SelectedFile.filename === file.filename
       && SelectedFile.fileExtension ===file.fileExtension
const handleRename =()=>[
  setisRenameDialogOpen(true)
]
const handleDelete =()=>[
  setisDeletedDialogOpen(true)
]
const confirmDelete =()=>{
  onDeleteFile?.(file,path)
  setisDeletedDialogOpen(false)
}
const handleRenameSubmit = (newFilename:string,newExtension:string)=>{
  onRenameFile?.(file,newFilename,newExtension,path)
  setisRenameDialogOpen(false)
}
    return (
      <SidebarMenuItem>
        <div className="group relative flex items-center">
          <SidebarMenuButton
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
              "hover:bg-accent/70 active:bg-accent",
              isSelected && "bg-accent text-accent-foreground font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            onClick={() => onFileSelect?.(file)}
            style={{ paddingLeft: `${indent + 20}px` }}
          >
            <File className="h-4 w-4 shrink-0 text-muted-foreground/80 group-hover:text-primary/90 transition-colors" />
            <span className="truncate">{fileName}</span>
          </SidebarMenuButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-1 h-7 w-7 rounded-md",
                  "opacity-0 group-hover:opacity-100 focus:opacity-100",
                  "hover:bg-accent/80 transition-opacity duration-200"
                )}
              >
                <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                className="gap-2 text-sm"
                onClick={handleRename}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-sm text-destructive focus:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    );
  }

  // ── Folder ───────────────────────────────────────────────────────────────
  else {
    const folder = item as TemplateFolder;
    const folderName = folder.folderName;
    const currentPath = path ? `${path}/${folderName}` : folderName;
    const handleAddFile = ()=>{
      setisNewFileDialogOpen(true)
    }
    const handleAddFolder = ()=>{
      setisNewFolderDialogOpen(true)
    }
    const handlerename =()=>{
      setisRenameDialogOpen(true)
    }
    const handleDelete = ()=>{
      setisDeletedDialogOpen(true)
    }
    const confirmdelete =()=>{
      onDeleteFolder?.(folder,path)
      setisDeletedDialogOpen(false)
    }
    const handleCreateFile =(filename:string,extension:string)=>{
      if(onAddFile){
        const newFile: TemplateFile={
          filename,
          fileExtension:extension,
          content:""

        }
        onAddFile(newFile,currentPath)
      }
      setisNewFileDialogOpen(false)
    }

    const handlecreatefolder = (foldername:string)=>{
      if(onAddFolder){
        const newFolder:TemplateFolder={
            folderName,
            items:[]
        }
        onAddFolder(newFolder,currentPath)
      }
      setisNewFolderDialogOpen(false)
    }

    const handlerenamesubmit = (newfoldername:string)=>{
      onRenameFolder?.(folder,newfoldername,path)
      setisRenameDialogOpen(false)
    }
    return (
      <SidebarMenuItem>
        <Collapsible
          open={isOpen}
          onOpenChange={setisOpen}
          className="group/collapsible"
        >
          <div className="relative flex items-center group">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  "hover:bg-accent/70 active:bg-accent",
                  isOpen && "bg-accent/40",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                style={{ paddingLeft: `${indent + 8}px` }}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground/70 transition-transform duration-200",
                    isOpen && "rotate-90 text-primary/80"
                  )}
                />
                <Folder className="h-4 w-4 shrink-0 text-blue-500/90" />
                <span className="flex-1 truncate font-medium">{folderName}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {/* Actions dropdown for folder */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-1 h-7 w-7 rounded-md",
                    "opacity-0 group-hover:opacity-100 focus:opacity-100",
                    "hover:bg-accent/80 transition-opacity duration-200"
                  )}
                >
                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="gap-2 text-sm" onClick={handleAddFile}>
                  <FilePlus className="h-3.5 w-3.5" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-sm" onClick={handleAddFolder}>
                  <FolderPlus className="h-3.5 w-3.5" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-sm" onClick={handlerename}>
                  <Edit3 className="h-3.5 w-3.5" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-sm text-destructive focus:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CollapsibleContent>
            <SidebarMenuSub className="pl-1">
              {folder.items.map((childItem, index) => (
                <TemplateNode
                  key={index}
                  item={childItem}
                  onFileSelect={onFileSelect}
                  SelectedFile={SelectedFile}
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDeleteFile={onDeleteFile}
                  onRenameFile={onRenameFile}
                  onRenameFolder={onRenameFolder}
                  onDeleteFolder={onDeleteFolder}
                  level={level + 1}
                  path={currentPath}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>

        <NewFileDialog
          isOpen={isNewFileDialogOpen}
          onClose={()=>setisNewFileDialogOpen(false)}
          onCreateFile={handleCreateFile}
        />
        <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={()=>setisNewFolderDialogOpen(false)}
        onCreateFolder={handlecreatefolder}
        />
        <RenameFolderDialog
        isOpen={isRenameDialogOpen}
        onClose={()=>setisRenameDialogOpen(false)}
        onRenameFolder={handlerenamesubmit}
        currentFolderName={folderName}
        />
      <AlertDialog open={isDeletedDialogOpen} onOpenChange={setisDeletedDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Folder
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete  {folderName} folder
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmdelete} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
      </SidebarMenuItem>
    );
  }
};

export default TemplateNode;