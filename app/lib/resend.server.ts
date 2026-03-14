import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("WARNING: RESEND_API_KEY is not set in environment variables");
} else {
  console.log("Resend client initialized with API key");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

