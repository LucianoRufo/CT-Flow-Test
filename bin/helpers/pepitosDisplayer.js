function CreateEpicAndPepitoDisplayer(params) {
  const { epicName, jiraId, pepitoName } = params;
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit checkout ${epicName}`);
  console.log("\x1b[33m", `git fetch`);
  console.log("\x1b[33m", `git pull --rebase origin ${epicName}`);
  console.log(
    "\x1b[33m",
    `git checkout -b pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
  console.log(
    "\x1b[33m",
    `git push origin ${epicName} pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
}

function CreatePepitoDisplayer(params) {
  const { jiraId, name } = params;
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit checkout develop`);
  console.log("\x1b[33m", `git fetch`);
  console.log("\x1b[33m", `git pull --rebase origin develop`);
  console.log("\x1b[33m", `git checkout -b pepito/CTDEV-${jiraId}_${name}`);
  console.log(
    "\x1b[33m",
    `git push origin develop pepito/CTDEV-${jiraId}_${name}`
  );
}

function DeleteSelfBranchWarning() {
  console.log(
    "\x1b[33m",
    "WARNING: Missing name argument, will finish current branch if it is a pepito"
  );
}
function DeletingCurrentBranchDisplayer(name) {
  console.log("\x1b[36m%s\x1b[0m", `Finishing current branch:${name}\n`);
}

function ClosePepitoOnEpicDisplayer(params) {
  const { epicName, branchName } = params;
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
  console.log("\x1b[33m", `git branch --show-current`);
  console.log("\x1b[33m", `git checkout ${epicName}`);
  console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
  console.log("\x1b[33m", `git branch -d ${branchName}`);
}

function ClosePepitoOnDevelopDisplayer(pepito) {
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
  console.log("\x1b[33m", `git branch --show-current`);
  console.log("\x1b[33m", `git checkout develop`);
  console.log("\x1b[33m", `git merge --no-ff ${pepito}`);
  console.log("\x1b[33m", `git branch -d ${pepito}`);
}

function HandleErrorDysplayer() {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow pepito start");
  console.log("or: ctflow pepito finish");
  console.log("\nManage your pepito branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  CreateEpicAndPepitoDisplayer: CreateEpicAndPepitoDisplayer,
  CreatePepitoDisplayer: CreatePepitoDisplayer,
  DeleteSelfBranchWarning: DeleteSelfBranchWarning,
  DeletingCurrentBranchDisplayer: DeletingCurrentBranchDisplayer,
  ClosePepitoOnEpicDisplayer: ClosePepitoOnEpicDisplayer,
  ClosePepitoOnDevelopDisplayer: ClosePepitoOnDevelopDisplayer,
  HandleErrorDysplayer: HandleErrorDysplayer,
};
