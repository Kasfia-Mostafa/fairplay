import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail({
  email,
  username,
  verifyCode,
}: {
  email: string;
  username: string;
  verifyCode: string;
}): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Fairplay | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.log("Error sending verification email");
    return { success: false, message: "Failed to send verification email" };
  }
}
