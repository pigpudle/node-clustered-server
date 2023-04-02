const cluster = require('cluster')
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
  // number of cores in the system
  const cpusCount = os.cpus().length;
  console.log(`CPUs: ${cpusCount}`);
  console.log(`Master started. Pid: ${pid}`);

  // Run itself as worker
  cluster.fork();
}

if (cluster.isWorker) {
  require('./worker.js');
}