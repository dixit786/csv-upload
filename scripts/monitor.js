// monitor.js
const os = require('os-utils');
const { exec } = require('child_process');

function monitorCPUUsage() {
    os.cpuUsage(function(v) {
        console.log('CPU Usage (%): ' + v * 100);

        if (v > 0.7) {
            console.log('CPU usage exceeded 70%. Restarting the server...');
            exec('pm2 restart data-upload-assessment ', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error restarting server: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Error: ${stderr}`);
                    return;
                }
                console.log(`Server restarted: ${stdout}`);
            });
        }
    });
}

setInterval(monitorCPUUsage, 5000); // Check CPU usage every 5 seconds
