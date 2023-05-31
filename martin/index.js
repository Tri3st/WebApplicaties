const express = require("express");
const app = express();
const router = express.Router();

const path = __dirname;
const port = 8090;

router.use((req, res, next) => {
    console.log('/' + req.method);
    next();
});

router.get("/", (req, res) => {
    res.sendFile(path + 'index.html');
});

router.get("/test/", (req, res) => {
    res.sendFile(path + '/test/test.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, () => {
    console.log("Nodejs Express listening on port " + port);
});

