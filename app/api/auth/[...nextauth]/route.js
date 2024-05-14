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
                console.log("credentials in authorize:",credentials)
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
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login'
    }
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};