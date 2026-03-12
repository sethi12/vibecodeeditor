import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { get } from "http";
import { getUserbyid } from "./features/auth/actions";
import { getAccountbyUserId } from "./features/auth/actions";
export const {auth, handlers,signIn,signOut } = NextAuth({
  callbacks:{
        async signIn({user,account,profile}){
            if(!user || !account ){
                return false;

            }
            const existingUser= await db.user.findUnique({where:{email:user.email!}});
            if(!existingUser){
                const newUser = await db.user.create({
                    data:{
                        email:user.email!,
                        name:user.name!,
                        image:user.image!,
                        accounts:{
                                 create:{
                                   type:account.type,
                            provider:account.provider,
                            providerAccountId:account.providerAccountId,
                            access_token:account.access_token,
                            refresh_token:account.refresh_token,
                            expires_at:account.expires_at,
                            token_type:account.token_type,
                            scope:account.scope,
                            id_token:account.id_token,
                            session_state:typeof account.session_state === 'string' ? account.session_state : null,
                        },
                    },
            },});
                if(!newUser){
                    return false;
                }
                return true;

            }else{
                const existingAccount= await db.account.findUnique({
                    where:{
                        provider_providerAccountId:{
                            provider:account.provider,
                            providerAccountId:account.providerAccountId,
                        },
                    },
                });
                if(!existingAccount){
                    await db.account.create({
                        data:{
                            userId:existingUser.id,
                            type:account.type,
                            provider:account.provider,
                            providerAccountId:account.providerAccountId,
                            access_token:account.access_token,
                            refresh_token:account.refresh_token,
                            expires_at:account.expires_at,
                            token_type:account.token_type,
                            scope:account.scope,
                            id_token:account.id_token,
                            session_state:typeof account.session_state === 'string' ? account.session_state : null,
                        },
                    });
                }
                return true;
            }

        

  },

  async jwt({token,user,account}){
    if(!token.sub){
        return token;
    }
    const existingUser = await getUserbyid(token.sub);
    if(!existingUser)return token;
    const existingAccount = await getAccountbyUserId(existingUser.id);
    token.name = existingUser.name;
    token.email = existingUser.email;
    token.role = existingUser.role;
    return token;
  },
  async session({session,token}){
    if(token.sub && session.user){
        session.user.id = token.sub;
    }
    if(token.sub && session.user){
        session.user.role = token.role;

    }
    return session;
  }
},
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig
});