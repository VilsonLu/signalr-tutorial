"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
}).catch((err) => {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", (event) => {
    const user = document.getElementById("userInput").value;
    const msg = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, msg).catch((err) => {
        return console.error(err.toString());
    });

    event.preventDefault();
})