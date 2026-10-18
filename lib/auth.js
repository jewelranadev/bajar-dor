import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("bajardor");

export const auth = betterAuth({

    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
    google:{
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env. GOOGLE_CLIENT_SECRET
    }
  },
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://bajar-dor-rho.vercel.app",
    "http://localhost:3000",
  ],
  database: mongodbAdapter(db, {
    client,
  }),
});