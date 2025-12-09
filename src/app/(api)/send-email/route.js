import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, firstName, doctorName, date, time } = await req.json();

    // Create transporter with Ethereal
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: `"Clinique" <${process.env.ETHEREAL_USER}>`,
      to: email,
      subject: "Confirmation de rendez-vous",
      html: `
        <h1>Rendez-vous confirmé</h1>
        <p>Bonjour ${firstName},</p>
        <p>Votre rendez-vous a été confirmé.</p>
        <p><strong>Médecin :</strong> ${doctorName}</p>
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Heure :</strong> ${time}</p>
      `,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return new Response(
      JSON.stringify({ success: true, previewUrl: nodemailer.getTestMessageUrl(info) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
