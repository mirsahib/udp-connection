const UDP = require("dgram");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./video.mp4");
 console.log("🚀 ~ filePath:", filePath)

const readStream = fs.createReadStream(filePath, { highWaterMark: 2 * 64 }); // Adjust chunk size as needed

const server = UDP.createSocket("udp4");

const port = 2222;
let currentDataIndex = 0; // Keep track of the current element to send

server.on("listening", () => {
    // Server address it’s using to listen

    const address = server.address();

    console.log(
        "Listining to ",
        "Address: ",
        address.address,
        "Port: ",
        address.port
    );
});

server.on("message", (message, info) => {
    console.log("Message from client", message.toString());
    //sending back response to client
    if (message.toString() === "start_stream") {
        sendData(info);
    }
    //sendData(info);
});

function sendData(udp) {
    console.log("🚀 ~ sendData ~ udp:", udp);
    let packet = 0;

    // Move this event listener outside of the "message" event listener
    readStream.on("data", (chunk) => {
        server.send(chunk, udp.port, udp.address, (err) => {
            console.log("🚀 ~ server.send ~ packet number:", packet);
            if (err) {
                console.error("Failed to send response !!");
            } else {
                console.log("Sending video chunk...");
            }
            packet++;
        });
    });

    readStream.on("end", () => {
        server.send("end", udp.port, udp.address, (err) => {
            if (err) {
                console.error("Failed to send response !!");
            } else {
                console.log("Video Sent Successfully");
            }
        });
    });
}

server.bind(port);
