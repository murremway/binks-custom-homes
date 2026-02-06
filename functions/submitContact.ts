import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();

        // Save to database
        await base44.asServiceRole.entities.ContactSubmission.create(payload);

        // Send email notification
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: "admin@binkshomes.org",
            subject: `New Contact: ${payload.subject || "General Inquiry"} — from ${payload.full_name}`,
            body: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${payload.full_name}</p>
                <p><strong>Email:</strong> ${payload.email}</p>
                <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
                <p><strong>Subject:</strong> ${payload.subject || "General Inquiry"}</p>
                <hr/>
                <p><strong>Message:</strong></p>
                <p>${payload.message}</p>
            `,
        });

        return Response.json({ success: true }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    } catch (error) {
        return Response.json({ error: error.message }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }
});