module.exports = async function (context, req) {
  try {
    context.log("JavaScript HTTP trigger function processed a request.");

    const requestBody = req.body;

    // Bind request parameters to variables
    const name = req.query.name || (requestBody && requestBody.name);
    const email = req.query.email || (requestBody && requestBody.email);
    const interest =
      req.query.interest || (requestBody && requestBody.interest);
    const message = req.query.message || (requestBody && requestBody.message);

    if (name && email && interest && message) {
      const resMessage = {
        body: `Received contact info: Name: ${name}, Email: ${email}, Interest: ${interest}, Message: ${message}`,
      };
      context.bindings.contacts = JSON.stringify([
        {
          Name: name,
          Email: email,
          Interest: interest,
          Message: message,
        },
      ]);
      context.bindings.mySbMsg = resMessage;

      context.res = {
        status: 200,
        body: resMessage.body,
      };
    } else {
      context.res = {
        status: 400,
        body: "Please provide all required parameters (name, email, interest, message).",
      };
    }
  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: "Internal Server Error",
    };
  }
};
