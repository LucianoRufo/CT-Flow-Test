const shell = require("shelljs");

function MergeToDevelopCloseBranch(params) {
  shell.exec(`git merge --no-ff epic/CTDEV-${params.jiraId}`);
  shell.exec(`git branch -d epic/CTDEV-${params.jiraId}`);
}
function MergeToDevelopCloseBranchFromBranch(params) {
  shell.exec(`git checkout develop`);
  shell.exec(`git merge --no-ff ${params}`);
  shell.exec(`git branch -d ${params}`);
}

function GetBranchName() {
  return shell.exec(`git branch --show-current`);
}

async function GetEpics() {
  let epicsList = await shell
    // .exec(`git branch -a | grep epic/CTDEV-`) Already logs
    .exec(`git branch -a | FINDSTR epic/CTDEV-`) //porque windows vite
    .split("\n")
    .map((branch) => branch.trim());
  return epicsList;
}

function AddLastToArrPrototype() {
  if (!Array.prototype.last.length) {
    Array.prototype.last = function () {
      return this[this.length - 1];
    };
  }
}

async function GetLogsFromHotFixStart(params, last=false) {
  const data = await shell.exec(
    `git log --walk-reflogs --oneline hotfix/CTDEV-${params.jiraId}_${params.name}`
  ).stdout;
  let position = !last ? data.toString().split("\n").length - 2 : 0;
  let storyPoint = data.toString().split("\n")[position].split(" ")[0];
  return { storyPoint };
}
module.exports = {
  MergeToDevelopCloseBranch: MergeToDevelopCloseBranch,
  GetBranchName: GetBranchName,
  MergeToDevelopCloseBranchFromBranch: MergeToDevelopCloseBranchFromBranch,
  GetEpics: GetEpics,
  AddLastToArrPrototype: AddLastToArrPrototype,
  GetLogsFromHotFixStart: GetLogsFromHotFixStart,
};
