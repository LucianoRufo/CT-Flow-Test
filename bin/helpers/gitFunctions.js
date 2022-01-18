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

module.exports = {
  MergeToDevelopCloseBranch: MergeToDevelopCloseBranch,
  GetBranchName: GetBranchName,
  MergeToDevelopCloseBranchFromBranch: MergeToDevelopCloseBranchFromBranch,
  GetEpics: GetEpics,
};
