import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Chrome } from "lucide-react"; 

async function handlesignInWithGoogle() {
  "use server"

  await signIn("google"); // provider, callbackUrl
}

// async function handlesignInWithGitHub() {
//   "use server"

//   await signIn("github"); // provider, callbackUrl
// }
export default function SignInFormClient() {


  return (
    <Card className="w-full max-w-[380px] border-zinc-700 bg-zinc-900/70 backdrop-blur-sm shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          Sign in to continue to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full h-12 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white gap-3"
          onClick={handlesignInWithGoogle}
        >
          <Chrome className="h-5 w-5 text-red-500" />
          Continue with Google
        </Button>

        {/* GitHub Button */}
        <Button
          variant="outline"
          className="w-full h-12 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white gap-3"
          // onClick={handlesignInWithGitHub}
        >
          <Github className="h-5 w-5" />
          Continue with GitHub
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-zinc-700" />
          </div>
  
        </div>

 
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center text-xs text-zinc-500 pt-2 pb-6">
        <p>
          By continuing, you agree to our{" "}
          <a href="#" className="text-zinc-300 hover:text-white underline underline-offset-4">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-zinc-300 hover:text-white underline underline-offset-4">
            Privacy Policy
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}