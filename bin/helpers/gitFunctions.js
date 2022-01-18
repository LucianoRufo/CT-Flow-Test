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

module.exports = {
  MergeToDevelopCloseBranch: MergeToDevelopCloseBranch,
  GetBranchName: GetBranchName,
  MergeToDevelopCloseBranchFromBranch: MergeToDevelopCloseBranchFromBranch,
};
