import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,       // your Gmail email
                pass: process.env.GMAIL_PASSWORD,   // App Password
            },
        });

        // Email content
        const mailOptions = {
            from: `"Clinique" <${process.env.GMAIL_USER}>`,
            to: body.email,
            subject: "Confirmation de rendez-vous",
            html: `
        <h1>Rendez-vous confirmé</h1>
        <p>Bonjour ${body.firstName},</p>
        <p>Votre rendez-vous a été confirmé.</p>
        <p><strong>Médecin :</strong> ${body.doctorName}</p>
        <p><strong>Date :</strong> ${body.date}</p>
        <p><strong>Heure :</strong> ${body.time}</p>
      `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, info }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
