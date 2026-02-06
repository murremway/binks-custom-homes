import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();

        // Save to database
        await base44.asServiceRole.entities.WarrantyClaim.create(payload);

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

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});