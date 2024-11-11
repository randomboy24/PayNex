import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:"",
            clientSecret:""
        })
    ],
    secret:"this is a secret",
    callbacks: {
        async signIn(credentials){
            // log(credentials)
            return true;
        }
    }
})

export {handler as GET,handler as POST}     