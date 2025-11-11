# UDP File Transfer System

This project implements a UDP-based file transfer system between a client and server. The system allows for streaming video files from a server to a client using UDP datagrams.

## Overview

The UDP File Transfer System consists of two main components:
- **Server**: Reads a video file and streams it to the client in chunks via UDP
- **Client**: Receives the video chunks and reconstructs the original file

## Architecture

### Server (`server/udp-server.js`)
- Creates a UDP socket using `dgram`
- Reads a video file using a stream with 128-byte chunks
- Waits for "start_stream" message from client
- Sends video chunks to the client when requested
- Sends an "end" message when the file transfer is complete

### Client (`client/udp-client.js`)
- Creates a UDP socket using `dgram`
- Sends a "start_stream" message to the server
- Receives video chunks from the server
- Concatenates received buffers into a complete video file
- Writes the final video to "video.mp4" when it receives an "end" message

## How to Use

1. Make sure you have Node.js installed
2. Place a video file named `video.mp4` in the `server/` directory (this file will be transferred to the client)
3. Start the server: `node server/udp-server.js`
4. In another terminal, start the client: `node client/udp-client.js`
5. The client will receive the video chunks and save them as `video.mp4` in the `client/` directory

## Demo

A demonstration of the UDP connection in action is available in `server/video.mp4`. This video shows the transfer process and how the system works in practice.

## Technologies Used

- Node.js
- UDP (dgram module)
- File System (fs module)
- Path module for file handling
