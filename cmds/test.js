'use strict'

const EPILOG = `
By default browser tests run in Chrome headless.
Browser testing with Karma supports options forwarding with '--' for more info check https://karma-runner.github.io/3.0/config/configuration-file.html
`

module.exports = {
  command: 'test',
  desc: 'Test your code in different environments',
  builder: (yargs) => {
    yargs
      .epilog(EPILOG)
      .example('aegir test -t webworker', 'Run tests in the browser with Karma inside a webworker.')
      .example('aegir test -t browser -- --browsers Firefox,Chrome,Safari', 'Tell Karma to run tests in several browsers at the same time.')
      .example('aegir test -w -t browser -- --browser Chrome', 'Debug tests with watch mode and tell Karma to open Chrome in a non-headless mode.')
      .options({
        target: {
          alias: 't',
          describe: 'In which target environment to execute the tests',
          type: 'array',
          choices: ['node', 'browser', 'webworker'],
          default: ['node', 'browser', 'webworker']
        },
        verbose: {
          alias: 'v',
          describe: 'Print verbose test output',
          default: false
        },
        watch: {
          alias: 'w',
          describe: 'Watch files for changes and rerun tests',
          default: false
        },
        files: {
          alias: 'f',
          describe: 'Custom globs for files to test',
          type: 'array',
          default: []
        },
        parallel: {
          alias: 'p',
          describe: 'Run tests in parallel (only available in node)',
          default: true
        },
        timeout: {
          describe: 'The default time a single test has to run',
          type: 'number',
          default: 5000
        },
        exit: {
          describe: 'Force shutdown of the event loop after test run: mocha will call process.exit',
          default: true
        },
        colors: {
          describe: 'Enable colors on output (only available in node runs)',
          default: true
        },
        grep: {
          alias: 'g',
          type: 'string',
          describe: 'Limit tests to those whose names match given pattern'
        },
        bail: {
          alias: 'b',
          describe: 'Mocha should bail once a test fails',
          default: false
        },
        flow: {
          describe: 'Run test with Flow support',
          default: false
        },
        progress: {
          describe: 'Use progress reporters on mocha and karma',
          default: false
        }
      })
  },
  handler (argv) {
    const test = require('../src/test')
    return test.run(argv)
  }
}
