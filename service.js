import { Service } from 'node-windows';

// Create a new service object
var svc = new Service({
  name:'NBU Open Data Bot Service',
  description: 'Run telegram bot for using nbu open data.',
  script: 'd:\\Repos\\NBU-Open-Data-bot\\main.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();