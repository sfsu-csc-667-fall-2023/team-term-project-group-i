import { io } from "socket.io-client";
import { configure as gameSocketConfig } from "./game_socket";
import * as GAME_CONSTANTS from "../../constants/games";

const gameSocketId = document.querySelector("#game-socket-id").value;
const userSocketId = document.querySelector("#user-socket-id").value;

gameSocketConfig(gameSocketId);