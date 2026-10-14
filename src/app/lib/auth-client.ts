import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
    baseURL: "https://bazar-dor-bd-app-git-main-bd-d5f3.vercel.app"
})


export const {
     signIn,
     signUp,
     signOut,
     
    useSession 
    } = createAuthClient()


    