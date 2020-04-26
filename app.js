Stream = require('node-rtsp-stream');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rtsp-web"
});

con.connect(function(err) {
  if (err) throw err;

  var query = "SELECT * FROM urlcctv";

  con.query(query, function (err, result, fields) {
    if (err) throw err;

    function rtspStream(name,url,port){
      stream = new Stream({
        name: name,
        streamUrl: url,
        wsPort: port,
        width: 480,
        height: 640,
        ffmpegOptions: { 
          '-stats': '', 
          '-r': 30 
        }
      })
    }

    for(a =0 ; a < result.length; a++){
      rtspStream(result[a].name,result[a].urlCCTV,result[a].port);
    }
    

  });
});






//rtsp://root:vivo1234@125.163.247.128:554/live2.sdp
//rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov



  

