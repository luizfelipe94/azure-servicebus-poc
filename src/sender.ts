import * as asb from "@azure/service-bus";

const emailList = [
    "test1@email.com",
    "test2@email.com",
    "test3@email.com",
    "test4@email.com",
    "test5@email.com",
    "test6@email.com",
    "test7@email.com",
    "test8@email.com",
];

const connection = "";
const serviceBus = new asb.ServiceBusClient(connection);
const sender = serviceBus.createSender("email-notifications");

(async () => {
    for (const email of emailList) {
        await sender.sendMessages({ body: JSON.stringify({ to: email }), contentType: "application/json", sessionId: "laranja" })
        .catch((error) => {
            console.log(error);
        });
    }
    for (const email of emailList) {
        await sender.sendMessages({ body: JSON.stringify({ to: email }), contentType: "application/json", sessionId: "azul" })
        .catch((error) => {
            console.log(error);
        });
    }
    await serviceBus.close();
    process.exit();
})();