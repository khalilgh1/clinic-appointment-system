export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Clinique <onboarding@resend.dev>",
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
      }),
    });

    let data;
    try {
      // Try parsing JSON
      data = await res.json();
    } catch (err) {
      // If parsing fails, fallback to text
      const text = await res.text();
      data = { message: text };
    }

    return new Response(JSON.stringify({ success: res.ok, data }), {
      status: res.ok ? 200 : 500,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
