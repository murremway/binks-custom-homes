import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import postgres from 'npm:postgres';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();

        // Connect to Netlify database
        const sql = postgres(Deno.env.get('NETLIFY_DATABASE_URL'));
        
        // Save to database
        await sql`
            INSERT INTO warranty_claims (
                owner_name, email, phone, property_address, closing_date,
                claim_category, description, urgency, photos, status
            ) VALUES (
                ${payload.owner_name}, ${payload.email}, ${payload.phone || null}, 
                ${payload.property_address}, ${payload.closing_date || null},
                ${payload.claim_category}, ${payload.description}, ${payload.urgency}, 
                ${JSON.stringify(payload.photos || [])}, 'submitted'
            )
        `;
        
        await sql.end();

        // Send email notification
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: "admin@binkshomes.org",
            subject: `Warranty Claim: ${payload.claim_category} — ${payload.owner_name}`,
            body: `
                <h2>New Warranty Claim Submitted</h2>
                <p><strong>Homeowner:</strong> ${payload.owner_name}</p>
                <p><strong>Email:</strong> ${payload.email}</p>
                <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
                <p><strong>Property:</strong> ${payload.property_address}</p>
                <p><strong>Closing Date:</strong> ${payload.closing_date || "Not provided"}</p>
                <p><strong>Category:</strong> ${payload.claim_category}</p>
                <p><strong>Urgency:</strong> ${payload.urgency}</p>
                <hr/>
                <p><strong>Description:</strong></p>
                <p>${payload.description}</p>
                ${payload.photos?.length > 0 ? `<p><strong>Photos attached:</strong> ${payload.photos.length}</p>` : ""}
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