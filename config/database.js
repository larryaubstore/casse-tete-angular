if(!process.env.DATABASE) {
  module.exports = {
      'url' : 'mongodb://localhost/passport'
  };
} else {
  module.exports = {
      'url' : process.env.DATABASE
  };
}
