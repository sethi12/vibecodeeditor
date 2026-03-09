import NextAuth from "next-auth";
import authconfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const {auth}= NextAuth(authconfig);

export default auth((req)=>{
    const {nextUrl}= req;
    const isloggedin= !!req.auth;
    const isApiAuthRoute= nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute= publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute= authRoutes.includes(nextUrl.pathname);
    if(isApiAuthRoute){
        return null
    }
    if(isAuthRoute){
        if(isloggedin){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
        }
        return null;
    }
    if(!isloggedin && !isPublicRoute){
        return Response.redirect(new URL("/auth/sign-in",nextUrl));
    }
    return null;
})

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};