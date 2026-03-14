"use client";
import React, { useEffect, useState } from "react";
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TemplateNode from "./template-node";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select 2";

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
interface TemplateFileTreeProps {
  data: TemplateItem;
  onFileSelect?: (file: TemplateFile) => void;
  SelectedFile?: TemplateFile;
  title?: string;
  onAddFile?: (file: TemplateFile, parentPath: string) => void;
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    newExtension: string,
    parentPath: string,
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string,
  ) => void;
}
const TemplateFileTree = ({
  data,
  onFileSelect,
  SelectedFile,
  title,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onRenameFile,
  onDeleteFolder,
  onRenameFolder,
}: TemplateFileTreeProps) => {

    const isRootFolder = data && typeof data ==="object" && "folderName" in data;
    const [isNewFileDialogOpen,setisNewFileDialogOpen] = useState(false);
    const [isNewFolderDialogOpen,setisNewFolderDialogOpen]= useState(false);

    const handleAddRootFile = ()=>{
      setisNewFileDialogOpen(true)
    }
     const handleAddRootFolder = ()=>{
      setisNewFolderDialogOpen(true)
    }

  return (
    <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    {title}
                </SidebarGroupLabel>
             <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <SidebarGroupAction title="Add new item">
      <Plus className="h-4 w-4" />
    </SidebarGroupAction>
  </DropdownMenuTrigger>

  <DropdownMenuContent side="right" align="start">
    <DropdownMenuItem onClick={handleAddRootFile}>
      <FilePlus className="h-4 w-4 mr-2" />
      New File
    </DropdownMenuItem>

    <DropdownMenuItem onClick={handleAddRootFolder}>
      <FolderPlus className="h-4 w-4 mr-2" />
      New Folder
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
<SidebarGroupContent>
  <SidebarMenu> {/* changed Sidebar → SidebarMenu here */}
    {isRootFolder ? (
      (data as TemplateFolder).items.map((child, index) => (
        <TemplateNode
          key={index}
          item={child}
          onFileSelect={onFileSelect}
          SelectedFile={SelectedFile}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
          onDeleteFile={onDeleteFile}
          onRenameFile={onRenameFile}
          onRenameFolder={onRenameFolder}
          onDeleteFolder={onDeleteFolder}
          level={0}
          path=""
        />
      ))
    ) : (
      <TemplateNode
        // key={0} // ← you used index here but index is not defined → fixed
        item={data} // ← changed child → data (since it's not root folder)
        onFileSelect={onFileSelect}
        SelectedFile={SelectedFile}
        onAddFile={onAddFile}
        onAddFolder={onAddFolder}
        onDeleteFile={onDeleteFile}
        onRenameFile={onRenameFile}
        onRenameFolder={onRenameFolder}
        onDeleteFolder={onDeleteFolder}
        level={0}
        path=""
      />
    )}
  </SidebarMenu>
</SidebarGroupContent>
<SidebarRail/>
<NewFileDialog
isOpen={isNewFileDialogOpen}
onClose={()=>setisNewFileDialogOpen(false)}
onCreateFile={()=>{}}

/>
<NewFolderDialog
  isOpen={isNewFolderDialogOpen}
  onClose={()=>setisNewFolderDialogOpen(false)}
  onCreateFolder={()=>{}}
/>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
};

export default TemplateFileTree;

/* New File Modal ---------------------------------*/
interface NewFileDialogProps{
  isOpen:boolean
  onClose:()=>void
  onCreateFile:(filename:string,extension:string)=>void
}
export  function NewFileDialog({isOpen,onClose,onCreateFile}:NewFileDialogProps){
  const [filename,setFilename]= useState("")
  const [extension,setExtension] = useState("")

  const handlesubmit = (e:React.FormEvent)=>{
    e.preventDefault()
      if (filename.trim()) {
        onCreateFile(filename.trim(), extension.trim() || "js");
        setFilename("")
        setExtension("js")
      }
  }

 return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New File</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Give your file a name and choose its type.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlesubmit} className="space-y-6 py-4">
          {/* Filename */}
          <div className="space-y-2">
            <Label htmlFor="filename">File Name</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="index"
              autoFocus
              className="h-10"
            />
          </div>

          {/* Extension */}
          <div className="space-y-2">
            <Label htmlFor="extension">File Extension</Label>
            <Select value={extension} onValueChange={setExtension}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select extension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tsx">.tsx (React)</SelectItem>
                <SelectItem value="ts">.ts (TypeScript)</SelectItem>
                <SelectItem value="js">.js (JavaScript)</SelectItem>
                <SelectItem value="jsx">.jsx (React JS)</SelectItem>
                <SelectItem value="css">.css</SelectItem>
                <SelectItem value="html">.html</SelectItem>
                <SelectItem value="json">.json</SelectItem>
                <SelectItem value="md">.md (Markdown)</SelectItem>
                <SelectItem value="txt">.txt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!filename.trim()}
              className={cn(
                "flex-1 sm:flex-none",
                "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700",
                "text-white shadow-md hover:shadow-lg transition-all"
              )}
            >
              Create File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface NewFolderDialogProps{
  isOpen:boolean
  onClose:()=>void
  onCreateFolder:(folderName:string)=>void
}

export   function NewFolderDialog({isOpen,onClose,onCreateFolder}:NewFolderDialogProps){
  const [folderName,setFolderName] = useState("")
  const handlesubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(folderName.trim()){
      onCreateFolder(folderName.trim());
      setFolderName("");
      onClose()
    }
  }
return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl flex items-center gap-2.5">
            <Folder className="h-5 w-5 text-primary" />
            Create New Folder
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Give your folder a clear and descriptive name
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlesubmit} className="space-y-6 py-4">
          {/* Folder Name Input */}
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="components / utils / hooks"
              autoFocus
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">
              Use descriptive names like "components", "pages", "utils"
            </p>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!folderName.trim()}
              className={cn(
                "flex-1 sm:flex-none",
                "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700",
                "text-white shadow-md hover:shadow-lg transition-all duration-300"
              )}
            >
              Create Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface RenameFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFileName: string;        // e.g. "index"
  currentExtension: string;       // e.g. "tsx"
  onRenameFile: (newName: string, newExtension: string) => void;
}

export  function RenameFileDialog({
  isOpen,
  onClose,
  currentFileName,
  currentExtension,
  onRenameFile,
}: RenameFileDialogProps) {
  const [fileName, setFileName] = useState(currentFileName);
  const [extension, setExtension] = useState(currentExtension);

  // Sync state when dialog re-opens with different file
  useEffect(() => {
    if (isOpen) {
      setFileName(currentFileName);
      setExtension(currentExtension);
    }
  }, [isOpen, currentFileName, currentExtension]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fileName.trim();
    if (trimmedName) {
      onRenameFile(trimmedName, extension.trim() || "tsx");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl flex items-center gap-2.5">
            <File className="h-5 w-5 text-primary" />
            Rename File
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Change the name and extension of your file
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* File Name */}
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="index"
              autoFocus
              className="h-10"
            />
          </div>

          {/* Extension */}
          <div className="space-y-2">
            <Label htmlFor="extension">Extension</Label>
            <Input
              id="extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              placeholder="tsx"
              className="h-10"
            />
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!fileName.trim()}
              className={cn(
                "flex-1 sm:flex-none",
                "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700",
                "text-white shadow-md hover:shadow-lg transition-all duration-300"
              )}
            >
              Rename File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFolderName: string;
  onRenameFolder: (newFolderName: string) => void;
}

export function RenameFolderDialog({
  isOpen,
  onClose,
  currentFolderName,
  onRenameFolder,
}: RenameFolderDialogProps) {
  const [folderName, setFolderName] = useState(currentFolderName);

  useEffect(() => {
    if (isOpen) {
      setFolderName(currentFolderName);
    }
  }, [isOpen, currentFolderName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = folderName.trim();
    if (trimmedName) {
      onRenameFolder(trimmedName);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl flex items-center gap-2.5">
            <Folder className="h-5 w-5 text-primary" />
            Rename Folder
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Give your folder a new name
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="components"
              autoFocus
              className="h-10"
            />
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!folderName.trim()}
              className={cn(
                "flex-1 sm:flex-none",
                "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700",
                "text-white shadow-md hover:shadow-lg transition-all duration-300"
              )}
            >
              Rename Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}