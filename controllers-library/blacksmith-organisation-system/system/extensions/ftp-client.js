var Client = require('ftp');
 var fs = require('fs');

 var c = new Client();
 c.on('ready', function() {
   c.get('foo.txt', function(err, stream) {
     if (err) throw err;
     stream.once('close', function() { c.end(); });
     stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
   });
 });
 // connect to localhost:21 as anonymous
 c.connect();





 var Client = require('ftp');

  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      console.dir(list);
      c.end();
    });
  });
  // connect to localhost:21 as anonymous
  c.connect();









  var Client = require('ftp');
 var fs = require('fs');

 var c = new Client();
 c.on('ready', function() {
   c.put('foo.txt', 'foo.remote-copy.txt', function(err) {
     if (err) throw err;
     c.end();
   });
 });
 // connect to localhost:21 as anonymous
 c.connect();
