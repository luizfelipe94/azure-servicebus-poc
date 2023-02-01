import * as asb from "@azure/service-bus";

const connection = "";
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