const shell = require("shelljs");

function MoveToDevelop() {
  shell.exec(`git checkout develop`);
  shell.exec(`git pull --rebase origin develop`);
}

module.exports = {
  MoveToDevelop: MoveToDevelop,
};
