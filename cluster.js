const cluster = require('cluster')
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
  // number of cores in the system
  const cpusCount = os.cpus().length;
  console.log(`CPUs: ${cpusCount}`);
  console.log(`Master started. Pid: ${pid}`);

  // Run workers (count = CPUs - 1 (1 core is for the master))
  for (let i = 0; i < cpusCount - 1; i++) {
    const worker = cluster.fork();
    worker.on('exit', () => {
      console.log(`Worker died! Pid: ${worker.process.pid}`);
      // Run worker again
      cluster.fork();
    });

    // Send message to worker
    worker.send('Hello from server!');
    // Receive messages from worker
    worker.on('message', (msg) => {
      console.log(`Message from worker ${worker.process.pid}: ${JSON.stringify(msg)}`);
    });
  }
}

if (cluster.isWorker) {
  require('./worker.js');

  // Receive messages from server
  process.on('message', (msg) => {
    console.log(`Message from master: ${msg}`);
  });

  // Send message to server
  process.send({ text: 'Hello', pid });
}