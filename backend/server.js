const path = require("path");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const testRoutes = require("./routes/test/index.js");
const requestTime = require("./middleware/request-time");
const rootRoutes = require("./routes/root");

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));
//app.use("/test", testRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, "static"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}



//app.use(requestTime); for middleware to check we get response


//app.use("/", rootRoutes);

const landingRoutes = require("./routes/landing");
const authRoutes = require("./routes/authentication");
const globalLobbyRoutes = require("./routes/global_lobby");
const gameRoutes = require("./routes/game");

app.use("/", landingRoutes);
app.use("/auth", authRoutes);
app.use("/lobby", globalLobbyRoutes);
app.use("/games", gameRoutes);
app.use("/test", testRoutes);

app.use((_request, _response, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

