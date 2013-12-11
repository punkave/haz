# haz

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/haz/master/logos/logo-box-madefor.png" align="right" /></a>

Determines if a program exists in the PATH environment variable. Cross platform, including support for checking likely executable file extensions on Windows. Available in synchronous and asynchronous versions. Thorough unit tests included.

## Installation

    npm install haz

## Usage

Here's a synchronous example:

```javascript
var haz = require('haz');

if (haz('convert')) {
  // Great, use spawn to run imagemagick's convert
}
```

And here's an asynchronous example with a callback:

```javascript
var haz = require('haz');

haz('convert', function(result) {
  if (result) {
    // Great, use spawn to run imagemagick's convert
  }
});
```

If you don't pass a callback, it behaves synchronously. Simple, right?

## Tests

    npm test

The tests convince  `haz` that is running in a realistic Windows environment for the Windows tests, and do the same for the Linux/Unix/MacOS/whatever tests.

## About P'unk Avenue and Apostrophe

`haz` was created at [P'unk Avenue](http://punkave.com) for use in many projects built with Apostrophe, an open-source content management system built on node.js. (You don't need Apostrophe to use `haz`.) If you like `haz` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/haz).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/haz/master/logos/logo-box-builtby.png" /></a>
