"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const AddRepoButton = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isCloning, setIsCloning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClone = async () => {
    setError(null);
    setSuccess(null);

    if (!repoUrl.trim()) {
      setError("Please enter a repository URL");
      return;
    }

    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub repository URL (example: https://github.com/username/repo)");
      return;
    }

    setIsCloning(true);

    try {
      // Here you would call your actual clone API / server action
      // For example: await cloneRepository(repoUrl);

      // Simulated delay (replace with real logic)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setSuccess("Repository cloned successfully! You can now open it in the editor.");
      setRepoUrl(""); // reset input
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to clone repository. Please try again."
      );
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-muted/30",
        "backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30",
        "transition-all duration-500 ease-out",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15",
        "hover:scale-[1.015] active:scale-[0.995]"
      )}
    >
      {/* Animated background glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-80",
          "bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5",
          "transition-opacity duration-700 blur-xl"
        )}
      />

      <div className="relative p-6 md:p-8 space-y-6">
        {/* Header / Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center",
                "text-primary group-hover:bg-primary/20 transition-colors"
              )}
            >
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Clone GitHub Repo
            </h3>
          </div>
        </div>

        {/* Input + Button row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className={cn(
                "bg-background/60 backdrop-blur-sm border-border/60",
                "focus-visible:ring-primary/40",
                error && "border-destructive focus-visible:ring-destructive/40"
              )}
              disabled={isCloning}
            />

            {/* Inline feedback messages */}
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5">
                <GitBranch className="h-4 w-4" />
                {success}
              </p>
            )}
          </div>

          <Button
            onClick={handleClone}
            disabled={isCloning || !repoUrl.trim()}
            className={cn(
              "min-w-[140px] gap-2 font-medium",
              "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
              "shadow-lg shadow-primary/20 hover:shadow-primary/30",
              "transition-all duration-300"
            )}
          >
            {isCloning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cloning...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Clone Repo
              </>
            )}
          </Button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-muted-foreground text-center md:text-left">
          Paste any public GitHub repository URL to clone it instantly
        </p>
      </div>
    </div>
  );
};

export default AddRepoButton;