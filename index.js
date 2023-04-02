const http = require('http');
const pid = process.pid;

// Request: "curl localhost:8800"
http.createServer((req, res) => {
  res.end('Hello from Node.js\n');
}).listen(8800, () => {
  console.log(`Server started. Pid: ${pid}`);
  // Get node processes: "ps | grep node"
  // And kill by pid: "kill <pid>"
});