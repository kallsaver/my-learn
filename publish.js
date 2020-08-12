const execSync = require('child_process').execSync

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString()

if (branch !== 'development') {
  console.log('is not in development branch')
}
