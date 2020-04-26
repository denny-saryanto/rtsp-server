var forever = require('forever-monitor');
const express = require('express');

    const app = express();

    var child = new (forever.Monitor)('app.js', {
        silent: true,
        killTree: true,
        args: []
    });

    child.on('start', function(){
        console.error('Server RTSP Berjalan');
    });

    child.on('restart', function(){
        console.error('Forever restarting script for ' + child.times + ' time');
    });

    child.on('exit', function () {
        console.log('Server RTSP Berhenti');
    });

    app.listen(1000, function(){
        console.log('Web Server Started On Port 1000');
    });

    app.get('/rtsp-stream/server', function(req, res, next) {

        var status = req.query.status;

        var detailStatus = 'Server RTSP ' + status;

        if(status == "start"){
            child.start();
            res.send(detailStatus);
        } else if(status == "restart"){
            //setTimeout(child.restart(), 20000);
            res.send("Server " + status + ' Wait For 12 Seconds...');

            child.stop();

            setTimeout(function() {
                child.start();
            }, 12000);

        } else if(status == "stop"){
            child.stop();
            res.send(detailStatus);
        }
    
    });

    //https://medium.com/@musliadi/apa-perbedaan-req-body-req-params-req-query-pada-nodejs-eb3450914447
