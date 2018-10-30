process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      '+(src|test)/**/*.ts',
      {
        pattern: 'test/scripts/*',
        included: false
      }
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    reporters: ['progress', 'karma-typescript'],
    karmaTypescriptConfig: {
      tsconfig: './tsconfig-spec.json',
      reports: {
        html: {
          directory: 'coverage',
          subdirectory: '.'
        },
        lcovonly: {
          directory: 'coverage',
          subdirectory: '.',
          filename: 'lcov.info'
        },
        'text-summary': ''
      }
    },
    customLaunchers: {
      ChromeHeadlessWithoutSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['ChromeHeadlessWithoutSandbox'],
    singleRun: true
  });
};
