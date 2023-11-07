var SC = require('soundcloud');

class SoundcloudControll{
  get ACCESSDATA(){
    return [
      "client_id",
      "redirect_uri",
      "oauth_token"
    ];
  }
  constructor(){

  }
}

SC.initialize({

});
// Initialize client
SC.init({
  id: 'your SoundCloud client ID',
  secret: 'your SoundCloud client secret',
  uri: 'your SoundCloud redirect URI'
});

// Connect user to authorize application
var initOAuth = function(req, res) {
  var url = SC.getConnectUrl();

  res.writeHead(301, { location: url });
  res.end();
};
