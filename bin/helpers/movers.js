const shell = require("shelljs");

function MoveToDevelop() {
  shell.exec(`git checkout develop`);
  shell.exec(`git pull --rebase origin develop`);
}

function MoveToBranch(branch) {
  shell.exec(`git checkout ${branch}`);
  shell.exec(`git fetch`);
  shell.exec(`git pull --rebase origin ${branch}`);
}

module.exports = {
  MoveToDevelop: MoveToDevelop,
  MoveToBranch: MoveToBranch,
};
