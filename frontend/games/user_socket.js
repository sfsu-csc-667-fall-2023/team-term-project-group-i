import { io } from "socket.io-client";
import * as GAME_CONSTANTS from "../../constants/games";

const userSocket = io({ query: { id: userSocketId }});

const configure = () => {
    
}

export { configure };