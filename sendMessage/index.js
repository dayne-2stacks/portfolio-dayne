const { ServiceBusClient } = require("@azure/service-bus");

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();
  const serviceBusClient = new ServiceBusClient(
    "Endpoint=sb://portfolio-service-bus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=NKPNAxNgClQX61bCYilOXPSOcJYofhJvB+ASbCTF45c="
  );

  const receiver = serviceBusClient.createReceiver("contacts", {
    receiveMode: "receiveAndDelete",
  });
  const myMessages = await receiver.receiveMessages(10);
  for await (let message of receiver.getMessageIterator()) {
    // your code here
    context.log(message);
  }
  context.log("Timer function processed request at", timeStamp);
};
