var assert = require('assert');
var haz = require('../index.js');
var path = require('path');

process.chdir(__dirname);

describe('haz', function() {
  describe('works synchronously "on Linux"', function() {
    it('exists', function() {
      unix();
      assert(haz);
    });
    it('can find program', function() {
      unix();
      assert(haz('program'));
    });
    it('cannot find xyzqdp', function() {
      unix();
      assert(!haz('xyzqdp'));
    });
    it('cannot find test', function() {
      unix();
      assert(!haz('test'));
    });
  });
  describe('works asynchronously "on Linux"', function() {
    it('can find program', function(done) {
      unix();
      haz('program', function(result) {
        assert(result);
        return done();
      });
    });
    it('cannot find xyzqdp', function(done) {
      unix();
      haz('xyzqdp', function(result) {
        assert(!result);
        return done();
      });
    });
    it('cannot find test', function(done) {
      unix();
      haz('test', function(result) {
        assert(!result);
        return done();
      });
    });
  });
  describe('works synchronously "on Windows"', function() {
    it('exists', function() {
      windows();
      assert(haz);
    });
    it('can find test', function() {
      windows();
      assert(haz('test'));
    });
    it('can find test.exe', function() {
      windows();
      assert(haz('test.exe'));
    });
    it('cannot find xyzqdp', function() {
      windows();
      assert(!haz('xyzqdp'));
    });
    it('cannot find program', function() {
      windows();
      assert(!haz('program'));
    });
  });
  describe('works asynchronously "on Windows"', function() {
    it('can find test', function(done) {
      windows();
      haz('test', function(result) {
        assert(result);
        return done();
      });
    });
    it('can find test.exe', function(done) {
      windows();
      haz('test.exe', function(result) {
        assert(result);
        return done();
      });
    });
    it('cannot find xyzqdp', function(done) {
      windows();
      haz('xyzqdp', function(result) {
        assert(!result);
        return done();
      });
    });
    it('cannot find program', function(done) {
      windows();
      haz('program', function(result) {
        assert(!result);
        return done();
      });
    });
  });
});

function unix() {
  process.env = {
    PATH: 'folder1:folder2:folder3:folder with spaces',
  };
  process.platform = 'linux';
  path.delimiter = ':';
}

function windows() {
  process.env = {
    PATH: 'folder1;folder2;folder3;folder with spaces',
    PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE'
  };
  process.platform = 'win32';
  path.delimiter = ';';
}
