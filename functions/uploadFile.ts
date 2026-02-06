import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const formData = await req.formData();
        const file = formData.get('file');

        const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file });

        return Response.json({ file_url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});