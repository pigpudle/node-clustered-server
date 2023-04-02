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
    cluster.fork();
  }
}

if (cluster.isWorker) {
  require('./worker.js');
}