var fs = require('fs');
var async = require('async');

// callback is optional. Without the callback it runs synchronously,
// returning true or false. With the callback it invokes the callback
// with true or false.

module.exports = function(name, callback) {
  var paths = (process.env.PATH || '').split(require('path').delimiter);
  if (callback) {
    return async.some(paths, function(path, callback) {
      return findInFolder(name, path, callback);
    }, callback);
  } else {
    return paths.some(function(path) {
      return executableNames(name).some(function(fullname) {
        return fs.existsSync(path + '/' + fullname);
      });
    });
  }
};

// On Windows a name without an explicit file extension could match an
// executable based on any of a list of file extensions found in
// the PATHEXT environment variable. On non-Windows it has to be a
// direct match. In both cases if a file extension is already in basename
// it must be an exact match.

function executableNames(basename) {
  if (!process.platform.match(/^win/)) {
    return [ basename ];
  }
  if (basename.match(/\.\w+/)) {
    return [ basename ];
  }
  var extensions = process.env.PATHEXT.split(';');
  return extensions.map(function(e) {
    // They come with dots
    return basename + e;
  });
}

function findInFolder(name, folder, callback) {
  var names = executableNames(name);
  return async.some(names, function(name, callback) {
    return fs.exists(folder + '/' + name, callback);
  }, callback);
}

