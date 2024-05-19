import connectToDatabase from "@/libs/db";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import * as bcrypt from 'bcrypt'

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions={
    providers:[
        Credentials({
            name:"credentials",
            credentials:{},

            async authorize(credentials){
                const {email,password,role} = credentials;
               
                try {
                    await connectToDatabase();

                    if(role==='Student'){
                        const user = await Student.findOne({email:email});
                        if(user){
                            const check = bcrypt.compareSync(password,user.password);
                            if(check){
                                return user;
                            }
                        }
                    }
                    else if(role==='Teacher'){
                        const user = await Teacher.findOne({email:email});
                        console.log("user in auth : ",user)
                        if(user){
                            const check = bcrypt.compareSync(password,user.password);
                            if(check){
                                return user;
                            }
                        }
                    }

                    return null;
                } catch (error) {
                    console.log("AUTHORIZE_ERROR:",error);
                    throw new Error(error);
                }
                
            }

        })
    ],
    callbacks:{
        async jwt({token,user,session}){
            
            // passing user id and role to token
            if(user){
                return{
                    ...token,
                    id:user._id,
                    role:user.role
                }
            }
            return token;
        },
        async session({session,token,user}){
            
            // passing user id and role from token to session           
            return {
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                    role:token.role 
                }
            }
            
        }
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login'
    },
    
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};