// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// // const client = new MongoClient("process.env.BETTER_AUTH_USER_NEXT_URL");
// const client = new MongoClient(
//   process.env.BETTER_AUTH_USER_NEXT_URL!
// );
// const db = client.db("bazar_dor_project");


// export const auth = betterAuth({
//      emailAndPassword: { 
//     enabled: true, 
//   }, 
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });








// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const mongoUri = process.env.BETTER_AUTH_USER_NEXT_URL;

// if (!mongoUri) {
//   throw new Error("MongoDB URI .env ফাইলে পাওয়া যায়নি");
// }

// const client = new MongoClient(mongoUri);
// const db = client.db("bazar_dor_project");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client,
//   }),

//   emailAndPassword: {
//     enabled: true,
    
//   },
// });








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

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
