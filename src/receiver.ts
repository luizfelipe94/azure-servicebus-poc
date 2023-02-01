import * as asb from "@azure/service-bus";

const connection = "Endpoint=sb://testpoc123321.servicebus.windows.net/;SharedAccessKeyName=poc;SharedAccessKey=Z7+mW9B76EG6sxxMhyZBG0wFCt5Ssv8Tr6auixYlGJc=;EntityPath=email-notifications";
const serviceBus = new asb.ServiceBusClient(connection);
const receiver = serviceBus.createReceiver("email-notifications");

(async () => {
    receiver.subscribe({
        async processMessage(message) {
            console.log(`session: ${message.sessionId} - body: ${message.body}`);  
            throw new Error("teste");          
        },
        async processError(args) {
            console.log(args.error);
        },
    }, { autoCompleteMessages: true });
    console.log("Application listening");
})();

process.on("SIGTERM", async () => {
    console.log("Shutting down...");
    await serviceBus.close();
});