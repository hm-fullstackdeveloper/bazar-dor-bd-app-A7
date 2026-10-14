
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.BETTER_AUTH_USER_NEXT_URL;

if (!mongoUri) {
  throw new Error("BETTER_AUTH_USER_NEXT_URL is missing in .env");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(mongoUri);

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = client;
}

const db = client.db("bazar_dor_project");

console.log("Google OAuth env check:", {
  clientIdExists: Boolean(process.env.BETTER_AUTH_GOOGLE_ID),
  clientSecretExists: Boolean(process.env.BETTER_AUTH_GOOGLE_SECRET),


});

console.log("Google OAuth env check:", {
  clientIdExists: Boolean(process.env.BETTER_AUTH_GITHUB_ID),
  clientSecretExists: Boolean(process.env.
    BETTER_AUTH_GITHUB_SECRET),
    
  });

  


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    
  },
  
   socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_ID!, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
        }, 
        
        
        github : { 
          clientId: process.env.BETTER_AUTH_GITHUB_ID!, 
          clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET!,
        }, 
        
      },
    
});
