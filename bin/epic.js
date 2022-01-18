const shell = require("shelljs");
const {StartDisplay, FinishDisplay, FinishFromEpicDisplay} = require("./helpers/epicDisplayer")
const {MoveToDevelop} = require("./helpers/movers")
const {MergeToDevelopCloseBranch, GetBranchName,MergeToDevelopCloseBranchFromBranch} = require("./helpers/gitFunctions")
const {CurrentBranchMessage} = require("./helpers/comonDisplayer")

async function start(argv) {
  StartDisplay(argv)
  MoveToDevelop()
  shell.exec(`git checkout -b epic/CTDEV-${argv.jiraId} develop`);
}

async function finish(argv) {
  let branchName = GetBranchName().toString();
  if (argv.jiraId) {
    MoveToDevelop()
    MergeToDevelopCloseBranch(argv)
    FinishDisplay(argv)
  } else {
    CurrentBranchMessage(branchName)
    if (branchName.toString().startsWith("epic/CTDEV-", 0)) {
      MoveToDevelop()
      MergeToDevelopCloseBranchFromBranch(branchName)
      FinishFromEpicDisplay(branchName)
    } else {
      console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON AN EPIC BRANCH");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow epic start");
  console.log("or: ctflow epic finish");
  console.log("\nManage your epic branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  epicStart: start,
  epicFinish: finish,
  epicHandleError: handleError,
};
