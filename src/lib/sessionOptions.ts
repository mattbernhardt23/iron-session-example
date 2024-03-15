import { SessionOptions } from "iron-session";

export interface SessionData {
  id: string;
  email: string;
  isLoggedIn: boolean;
  password: string;
}
 
export const defaultSession: SessionData = {
  id: "",
  email: "",
  isLoggedIn: false,
  password: ""
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-app-router-client-component-route-handler-swr",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
