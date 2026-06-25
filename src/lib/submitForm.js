import { FORM_SUBMIT_URL } from "./formConfig";

async function parseFormSubmitResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Form submission failed");
  }
  return data;
}

export async function submitContactForm(values) {
  const response = await fetch(FORM_SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New Contact: ${values.subject || "General Inquiry"} — ${values.full_name}`,
      _template: "table",
      _captcha: "false",
      _replyto: values.email,
      "Full Name": values.full_name,
      Email: values.email,
      Phone: values.phone || "Not provided",
      Subject: values.subject || "General Inquiry",
      Message: values.message,
    }),
  });

  return parseFormSubmitResponse(response);
}

const categoryLabels = {
  structural: "Structural",
  plumbing: "Plumbing",
  electrical: "Electrical",
  hvac: "HVAC",
  roofing: "Roofing",
  flooring: "Flooring",
  paint_drywall: "Paint & Drywall",
  windows_doors: "Windows & Doors",
  appliances: "Appliances",
  other: "Other",
};

const urgencyLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  emergency: "Emergency",
};

export async function submitWarrantyClaimForm(values, photoFiles = []) {
  const category = categoryLabels[values.claim_category] ?? values.claim_category;
  const urgency = urgencyLabels[values.urgency] ?? values.urgency;

  const formData = new FormData();
  formData.append("_subject", `Warranty Claim: ${category} — ${values.owner_name}`);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("_replyto", values.email);
  formData.append("Homeowner Name", values.owner_name);
  formData.append("Email", values.email);
  formData.append("Phone", values.phone || "Not provided");
  formData.append("Property Address", values.property_address);
  formData.append("Closing Date", values.closing_date || "Not provided");
  formData.append("Issue Category", category);
  formData.append("Urgency", urgency);
  formData.append("Description", values.description);

  photoFiles.forEach((file) => {
    formData.append("attachment", file, file.name);
  });

  const response = await fetch(FORM_SUBMIT_URL, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  return parseFormSubmitResponse(response);
}
