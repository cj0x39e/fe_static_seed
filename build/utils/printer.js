const chalk = require('chalk');


let isShowWelcome = false;
const print = (msg) => {
  if (!isShowWelcome) {
    console.log(chalk.rgb(255, 159, 0)(`
___  _  _  _______ 
 ||  |  |  |__|___ 
 ||__|__|__|  |___                                                   
`));
    isShowWelcome = true;
  }
  console.log(msg);
}

const command = (msg) => {
  print(`${chalk.blue('运行: ')}${chalk.green(msg)}`);
}

const error = (msg) => {
  print(chalk.red(msg));
}

const info = (msg) => {
  print(chalk.rgb(255, 159, 0)(msg));
}

const description = (title, msg) => {
  print(`${chalk.blue(title)} : ${chalk.green(msg)}`);
}


module.exports = {
  info,
  command,
  error,
  description
}