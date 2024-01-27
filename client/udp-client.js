const UDP = require("dgram");
const fs = require("fs");

const client = UDP.createSocket("udp4");

const port = 2222;

const hostname = "localhost";
let receivedBuff = Buffer.alloc(0);
let packetNumber = 0;
client.on("message", (message, info) => {
    // get the information about server address, port, and size of packet received.

    console.log("🚀 client.received ~ packet number:", packetNumber);

    //read message from server
    let endMessage = message.toString();
    if (endMessage === "end") {
        console.log("🚀 ~ client.on ~ endMessage:", endMessage);
        fs.writeFileSync("video.mp4", receivedBuff);
        client.close();
    } else {
        receivedBuff = Buffer.concat([receivedBuff, message]);
    }
    packetNumber++;
});
console.log("Send me the video !!");
const packet = Buffer.from("start_stream");

client.send(packet, port, hostname, (err) => {
    if (err) {
        console.error("Failed to send packet !!");
    } else {
        console.log("Packet send !!");
    }
});
