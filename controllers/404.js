const path = require('path');
const rootDir = require('../utils/path');

exports.get404page = (req, res, next)=>{
  res.status(404).sendFile(path.join(rootDir, 'views', 'page404.html'));
}