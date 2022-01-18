const shell = require("shelljs");
const {
  StartDisplay,
  FinishDisplay,
  FinishFromEpicDisplay,
  HandleEpicError,
} = require("./helpers/epicDisplayer");
const { MoveToDevelop } = require("./helpers/movers");
const {
  MergeToDevelopCloseBranch,
  GetBranchName,
  MergeToDevelopCloseBranchFromBranch,
} = require("./helpers/gitFunctions");
const {
  CurrentBranchMessage,
  EpicFinishWrongBrnahError,
} = require("./helpers/comonDisplayer");

async function start(argv) {
  StartDisplay(argv);
  MoveToDevelop();
  shell.exec(`git checkout -b epic/CTDEV-${argv.jiraId} develop`);
}

async function finish(argv) {
  let branchName = GetBranchName().toString();
  if (argv.jiraId) {
    MoveToDevelop();
    MergeToDevelopCloseBranch(argv);
    FinishDisplay(argv);
  } else {
    CurrentBranchMessage(branchName);
    if (branchName.toString().startsWith("epic/CTDEV-", 0)) {
      MoveToDevelop();
      MergeToDevelopCloseBranchFromBranch(branchName);
      FinishFromEpicDisplay(branchName);
    } else {
      EpicFinishWrongBrnahError();
    }
  }
}

async function handleError(argv) {HandleEpicError()}

module.exports = {
  epicStart: start,
  epicFinish: finish,
  epicHandleError: handleError,
};
