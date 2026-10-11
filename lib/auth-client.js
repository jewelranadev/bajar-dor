import { createAuthClient } from "better-auth/react";

// ফ্রন্টএন্ড ও API একই ডোমেইনে থাকলে baseURL লাগে না
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;