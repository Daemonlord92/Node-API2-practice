const express = require('express');
const cors = require('cors');
const shortid = require('shortid')
const server = express();

const postsRouter = require("./routes/api/posts");

server.use(express.json())
server.use(cors())

server.use("/post", postsRouter);

server.use('/', (req, res) => res.send('API up and running!'))

server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);