var tumblr = require('tumblr');

var oauth = {
  consumer_key: 'OAuth Consumer Key',
  consumer_secret: 'OAuth Consumer Secret',
  token: 'OAuth Access Token',
  token_secret: 'OAuth Access Token Secret'
};

var blog = new tumblr.Blog('blog.tumblr.com', oauth);

blog.text({limit: 2}, function(error, response) {
  if (error) {
    throw new Error(error);
  }

  console.log(response.posts);
});

var user = new tumblr.User(oauth);

user.info(function(error, response) {
  if (error) {
    throw new Error(error);
  }

  console.log(response.user);
});
