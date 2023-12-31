import { io } from "socket.io-client";
import * as GAME_CONSTANTS from "../../constants/games";

let gameSocket;

const configure = (socketId) => {
    gameSocket = io({ query: { id: socketId }});

    gameSocket.on(GAME_CONSTANTS.START, data => {
        console.log({ event: GAME_CONSTANTS.START, data })
    });

    gameSocket.on(GAME_CONSTANTS.USER_ADDED, data => {
        console.log({ event: GAME_CONSTANTS.USER_ADDED, data })
    });
}

export { configure };