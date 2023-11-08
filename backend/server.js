require("dotenv").config();
const express = require("express");
const path = require("path");
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
app.use("/test", testRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV = "development") {
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, "backend", "static"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
} 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(requestTime); for middleware to check we get response
app.use(express.static(path.join(__dirname, "static")));

app.use("/", rootRoutes);

app.use((_request, _response, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 

 