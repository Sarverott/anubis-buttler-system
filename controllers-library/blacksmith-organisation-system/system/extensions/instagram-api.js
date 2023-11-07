var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret`
// or `access_token` previously entered if they exist.
ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });
ig.use({ client_id: 'YOUR_CLIENT_ID',
         client_secret: 'YOUR_CLIENT_SECRET' });

         app.post('/like/:media_id', function(req, res, next) {
  var ig = require('instagram-node').instagram({});
  ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });

  ig.add_like(req.param('media_id'), {
    sign_request: {
      client_secret: 'YOUR_CLIENT_SECRET',
      // Then you can specify the request:
      client_req: req
      // or the IP on your own:
      ip: 'XXX.XXX.XXX.XXX'
    }
  }, function(err) {
    // handle err here
    return res.send('OK');
  });
});
