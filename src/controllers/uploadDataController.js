const path = require('path');
const { Worker } = require('worker_threads');
const fs = require('fs');


module.exports.uploadData = (req, res) => {
    const filePath = path.resolve("./", req.file.path);

    const worker = new Worker('./src/utils/worker.js', {
        workerData: {
            filePath
        }
    });

    worker.on('message', async ({ message, filePath }) => {
        fs.unlink(filePath, (err) =>{
            if (err) throw err;
            console.log(`${filePath} was deleted`);
        });
        res.send(message);
    });

    worker.on('error', (err) => {
        console.log("Error ==>> ", err)
        res.status(500).send(err.message);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            res.status(500).send(`Worker stopped with exit code ${code}`);
        }
    });
}

