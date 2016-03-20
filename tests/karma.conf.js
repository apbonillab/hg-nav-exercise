module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    browsers: ['PhantomJS'],

    files: [
      '../public/js/hg-nav.js',
      '*.js'
    ],

    singleRun: true,

    phantomjsLauncher: {
      exitOnResourceError: true
    }
  });
};