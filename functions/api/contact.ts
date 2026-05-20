interface Env {
  EMAIL_API_KEY: string
  CONTACT_EMAIL?: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    // Parse JSON payload from client
    const { name, email, message } = (await request.json()) as {
      name: string
      email: string
      message: string
    }

    // Input validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Please supply a name, email address, and message.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = env.EMAIL_API_KEY
    if (!apiKey) {
      console.error('Missing EMAIL_API_KEY environment variable.')
      return new Response(
        JSON.stringify({ error: 'Email configuration is missing on the server. Please define EMAIL_API_KEY.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fallback to support@thecalcpro.com if no env.CONTACT_EMAIL is set
    const destinationEmail = env.CONTACT_EMAIL || 'support@thecalcpro.com'

    // Call Resend REST API via Fetch API (Native Edge-compatible HTTP client)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Safeguard 1: utilise safe verified onboarding identifier
        from: 'Contact Form <onboarding@resend.dev>',
        to: destinationEmail,
        // Safeguard 2: map the visitor's input strictly to reply_to to reply directly from email client
        reply_to: email,
        subject: `New Contact Submission from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid rgba(255,255,255,0.06); background-color: #121212; color: #f0ede8; border-radius: 16px;">
            <h2 style="color: #ff9d2e; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-top: 0;">New Inquiry Received</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #a0988a; width: 100px;"><strong>Name:</strong></td>
                <td style="padding: 6px 0; color: #f0ede8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #a0988a;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; color: #f0ede8;"><a href="mailto:${email}" style="color: #ff9d2e; text-decoration: none;">${email}</a></td>
              </tr>
            </table>

            <div style="margin-top: 15px; padding: 18px; background-color: #1a1a1a; border-radius: 12px; border-left: 4px solid #ff9d2e;">
              <p style="margin: 0; font-weight: bold; color: #a0988a; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Visitor Message:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #f0ede8;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 25px 0;" />
            <p style="font-size: 11px; color: #6a6258; margin: 0; text-align: center;">
              This inquiry was dispatched via the edge-routing network on TheCalcPro.
              You can hit "Reply" in your email client to respond directly to this visitor.
            </p>
          </div>
        `,
      }),
    })

    if (!resendResponse.ok) {
      const errorPayload = await resendResponse.text()
      console.error('Resend delivery failure output:', errorPayload)
      return new Response(
        JSON.stringify({ error: 'Email gateway failed to deliver message. Check environment parameters.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const responseData = await resendResponse.json()
    return new Response(
      JSON.stringify({ success: true, id: (responseData as any).id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('Unhandled Edge Function error:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'An unexpected internal routing error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Support OPTIONS preflight requests for API safety/CORS
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
