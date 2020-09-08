const child_process = require('child_process');
const platform = process.platform;

const isWindows = platform === 'win32';

const getRunBin = (bin) => {
  if (isWindows) {
    return `${bin}.cmd`;
  } else {
    return bin;
  }
}

const exec = (command, callback) => {
  const args = command.split(/\s+/);
  const bin = args[0];
  let options = [];

  if (args.length > 1) {
    options = args.slice(1);
  }

  const child = child_process.spawn(
    getRunBin(bin),
    options,
    { 'stdio': 'inherit' }
  );
  child.on('close', (code) => {
    if (code === 0) {
      callback && callback()
    }
  });
  child.on('error', function(err) {
    console.error(err);
    process.exit(1);
  });
}

const openFileBrowser = (path) => {
  if (isWindows) {
    require('child_process').exec(`start ${path}`);
  } else {
    require("child_process").exec(`open ${path}`);
  }
}

module.exports = {
  exec,
  openFileBrowser
}