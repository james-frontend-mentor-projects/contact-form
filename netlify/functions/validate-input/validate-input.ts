import { Handler } from "@netlify/functions";

type FormParams = {
  "first-name"?: string;
  "last-name"?: string;
  email?: string;
  message?: string;
  "query-type"?: "general-enquiry" | "support-query";
  consent?: boolean;
};

export const handler: Handler = async (event, context) => {
  let body: FormParams;
  try {
    body = JSON.parse(event.body) as FormParams;
  } catch (e) {
    console.log(event);
    return {
      statusCode: 422, // Unprocessable Entity
      body: JSON.stringify({
        message: `[ERROR] Invalid JSON - ${e.message}`,
      }),
    };
  }

  let badFields = [];
  if (!body["first-name"]) badFields.push("first-name");
  if (!body["last-name"]) badFields.push("last-name");
  if (!body.email) badFields.push("email-required");
  if (body.email && body.email.length < 10) badFields.push("email-invalid"); // arbitrary check to show validation working
  if (!body.message) badFields.push("message");
  if (!body["query-type"]) badFields.push("query-type-required");
  if (!body.consent) badFields.push("consent-required");

  if (badFields.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        badFields,
      }),
    };
  } else {
    return {
      statusCode: 204,
    };
  }
};
