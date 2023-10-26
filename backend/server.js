const path = require("path"); 
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const requestTimeMiddleware = require("./middleware/request-time.js")
const rootRoutes = require("./routes/root.js"); 

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV = "development") {
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

app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "backend", "static")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static"))); 

app.use(express.static(path.join(__dirname, "static")));

app.use(requestTimeMiddleware);

app.use("/", rootRoutes);

app.use((_request, _response, next) => {
    next(createError(404));
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
