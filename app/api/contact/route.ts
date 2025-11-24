// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { name, email, phone, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Facile. Studio <onboarding@resend.dev>",
            to: "contact@facile.studio",
            subject: "New email from Facile.",
            html: `
                <h2>New Email sent</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });
        console.log("YES");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
