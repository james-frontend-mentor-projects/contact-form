import { Handler } from "@netlify/functions";

type FormParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  queryType?: string;
  consent?: boolean;
};

export const handler: Handler = async (event, context) => {
  let body;
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
  if (!body.firstName) badFields.push("firstName");
  if (!body.lastName) badFields.push("lastName");
  if (!body.email) badFields.push("email");
  if (!body.message) badFields.push("message");
  if (!body.queryType) badFields.push("queryType");
  if (!body.consent) badFields.push("consent");

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
