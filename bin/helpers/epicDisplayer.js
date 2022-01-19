const { BaseMessage } = require("./comonDisplayer");

function StartDisplay(params) {
  BaseMessage();
  console.log("\x1b[33m", `\n 1- git checkout develop`);
  console.log("\x1b[33m", `\n 2- git pull --rebase origin develop`);
  console.log(
    "\x1b[33m",
    `\n 3- git checkout -b epic/CTDEV-${params.jiraId} develop`
  );
}

function FinishDisplay(params) {
  BaseMessage();
  console.log("\x1b[33m", `git checkout develop`);
  console.log("\x1b[33m", `git merge --no-ff epic/CTDEV-${params.jiraId}`);
  console.log("\x1b[33m", `git branch -d epic/CTDEV-${params.jiraId}`);
}

function FinishFromEpicDisplay(params) {
  BaseMessage();
  console.log("\x1b[33m", `\ngit branch --show-current`);
  console.log("\x1b[33m", `\ngit checkout develop`);
  console.log("\x1b[33m", `git merge --no-ff ${params}`);
  console.log("\x1b[33m", `git branch -d ${params}`);
}

function HandleEpicError() {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow epic start");
  console.log("or: ctflow epic finish");
  console.log("\nManage your epic branches.");
  console.log("For more specific help type the command followed by --help");
}

function AllEpicBranches() {
  console.log("\x1b[36m%s\x1b[0m", "ALL EPIC BRANCHES:\n");
}

function AllLocalBranches(list) {
  console.log("\x1b[36m%s\x1b[0m", "\nLocal epics available: ", list, "\n");
}

function NoEpics() {
  console.log("\x1b[31m", "ERROR: There are no epics");
}

module.exports = {
  StartDisplay: StartDisplay,
  FinishDisplay: FinishDisplay,
  FinishFromEpicDisplay: FinishFromEpicDisplay,
  HandleEpicError: HandleEpicError,
  AllEpicBranches: AllEpicBranches,
  AllLocalBranches: AllLocalBranches,
  NoEpics: NoEpics,
};
