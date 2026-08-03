import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production, you would use a service like EmailJS, Resend, or SendGrid
    // For now, we'll simulate the email sending
    console.log("Contact form submission:", validatedData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example with EmailJS (uncomment and add your credentials):
    // import emailjs from '@emailjs/browser';
    // await emailjs.send(
    //   process.env.EMAILJS_SERVICE_ID!,
    //   process.env.EMAILJS_TEMPLATE_ID!,
    //   {
    //     from_name: validatedData.name,
    //     from_email: validatedData.email,
    //     subject: validatedData.subject,
    //     message: validatedData.message,
    //   },
    //   process.env.EMAILJS_PUBLIC_KEY!
    // );

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
