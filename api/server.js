const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../public/data/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);
server.use(cors());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
module.exports = server;