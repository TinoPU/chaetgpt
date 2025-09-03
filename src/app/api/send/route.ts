import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { input, ip } = await req.json();

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.EMAIL_TO!,
            subject: "New Form Submission",
            text: `New submission:\n\nValue: ${input}\nIP: ${ip}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
