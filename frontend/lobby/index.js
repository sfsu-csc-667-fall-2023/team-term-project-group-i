import { io } from "socket.io-client";

const gameEntryTemplate = document.querySelector("#join-game-entry");
const gameList = document.querySelector("#game-list ul");

const socket = io();

socket.on("game:created", ({ id }) => {
    const entry = gameEntryTemplate.content.cloneNode(true);
    const a = entry.querySelector("a");

    a.href = `/games/${id}/join`;
    a.innerText = `Join ${id}`;

    gameList.appendChild(entry);
});