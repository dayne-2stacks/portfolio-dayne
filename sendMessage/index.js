const { ServiceBusClient } = require("@azure/service-bus");

module.exports = async function (context, myTimer) {
  try {
    var timeStamp = new Date().toISOString();
    const serviceBusClient = new ServiceBusClient(
      "Server=tcp:portfolio-server-dayne.database.windows.net,1433;Initial Catalog=portfolio-database;Persist Security Info=False;User ID=dayneguy;Password=@Josephine13};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
    );

    const receiver = serviceBusClient.createReceiver("contacts", {
      receiveMode: "receiveAndDelete",
    });

    const maxMessagesToProcess = 1; // Adjust this value as needed

    for (let i = 0; i < maxMessagesToProcess; i++) {
      try {
        const messages = await receiver.receiveMessages(1);
        if (messages.length === 0) {
          // No more messages to process, break the loop
          break;
        }

        const message = messages[0];
        const messageBody = message.body.toString("utf8"); // Convert the buffer to a string

        // Process the message content here

        // Log the message content as a string
        context.log(messageBody);
      } catch (messageError) {
        // Handle the error when receiving or processing a message
        context.log.error(
          "Error receiving/processing a message:",
          messageError
        );
        // You can choose to continue processing other messages or return an error response if needed
      }
    }

    context.log("Timer function processed request at", timeStamp);
  } catch (error) {
    context.log.error("Error in the main function:", error);
    context.res = {
      status: 500,
      body: "Internal Server Error",
    };
  }
};
