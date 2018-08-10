const StaticServer = require('static-server');

const server = new StaticServer({
  rootPath: './public/',
  port: 3000,
});

server.start(() => {
  console.info(`Server started on port: ${server.port}`);
});
