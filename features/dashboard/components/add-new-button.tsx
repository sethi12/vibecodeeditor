"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TemplateSelectionModal from "./template-selection-model";
import { set } from "date-fns";
import { createplayground } from "../actions";
import { toast } from "sonner";

const AddNewButton = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);
  const router =useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<{
    title:string,
    template:"REACTJS" | "NEXTJS" | "EXPRESSJS" | "VUEJS" | "ANGULARJS" | "HONO";
    description:string
  }| null>(null);


  const handlesubmit = async(data:{ title:string,
    template:"REACTJS" | "NEXTJS" | "EXPRESSJS" | "VUEJS" | "ANGULARJS" | "HONO";
    description:string}) => {
      setSelectedTemplate(data);
      const res = await createplayground(data);
      toast.success('Playground created successfully!');
      setIsModalOpen(false);
      router.push(`/playground/${res?.id}`);
    }

  return (
    <>
    <div
    onClick={()=>setIsModalOpen(true)}
      className={cn(
        "group relative",
        "overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-background/80 to-muted/30",
        "backdrop-blur-sm border border-border/40",
        "shadow-lg shadow-black/5 dark:shadow-black/30",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/15",
        "hover:scale-[1.015] active:scale-[0.995]",
        "cursor-pointer"
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-br from-rose-500/5 via-red-500/5 to-pink-500/5",
          "transition-opacity duration-700 ease-out",
          "blur-xl"
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-between gap-8 p-7 md:p-8">
        {/* Left side */}
        <div className="flex flex-col items-start gap-5 flex-1">
          {/* Floating plus button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-14 w-14 rounded-2xl bg-background/60 backdrop-blur-md",
              "border border-border/50 shadow-sm",
              "text-primary hover:bg-primary/10 hover:text-primary",
              "transition-all duration-400 group-hover:scale-110 group-hover:rotate-180",
              "group-hover:shadow-primary/20 group-hover:shadow-lg"
            )}
          >
            <Plus className="h-7 w-7" />
          </Button>

          {/* Text */}
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              New Playground
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Start fresh or pick a template in seconds
            </p>
          </div>
        </div>

        {/* Right side – illustration + label */}
        <div className="flex flex-col items-end gap-8 relative">
          {/* Sleek "Add New" badge */}
          <div
            className={cn(
              "px-5 py-2 rounded-full",
              "bg-gradient-to-r from-rose-500/10 to-pink-500/10",
              "text-sm font-medium text-primary tracking-wide",
              "border border-primary/20",
              "transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
            )}
          >
            + Add New
          </div>

          {/* Animated illustration */}
          <div className="relative">
            <Image
              src="/add-new.svg"
              alt="Create new playground illustration"
              width={160}
              height={160}
              className={cn(
                "transition-all duration-700 ease-out",
                "group-hover:translate-x-10 group-hover:scale-110",
                "group-hover:rotate-12 drop-shadow-2xl",
                "group-hover:drop-shadow-[0_20px_40px_rgba(233,63,63,0.25)]"
              )}
              priority
            />

            {/* Glow ring on hover */}
            <div
              className={cn(
                "absolute inset-[-20%] rounded-full",
                "bg-gradient-to-r from-rose-500/0 via-pink-500/20 to-rose-500/0",
                "opacity-0 group-hover:opacity-70 blur-3xl",
                "transition-opacity duration-1000 ease-out"
              )}
            />
          </div>
        </div>
      </div>
    </div>

    <TemplateSelectionModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handlesubmit}
    />
    </>
  );
};

export default AddNewButton;