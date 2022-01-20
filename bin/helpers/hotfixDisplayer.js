function CreateHotFixBaseDisplay(params) {
  const { name, jiraId } = params;
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit checkout master`);
  console.log("\x1b[33m", `\ngit pull --rebase origin master`);
  console.log(
    "\x1b[33m",
    `\ngit checkout -b hotfix/CTDEV-${jiraId}_${name} master`
  );
  console.log("\x1b[33m", `\ngit push origin hotfix/CTDEV-${jiraId}_${name}`);
}

function FinishHotFixByIdAndNameDisplay(params) {
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit checkout master`);
  console.log(
    "\x1b[33m",
    `git merge --no-ff hotfix/CTDEV-${params.jiraId}_${params.name}`
  );
  console.log(
    "\x1b[33m",
    `git branch -d hotfix/CTDEV-${params.jiraId}_${params.name}`
  );
}

function FinishCurrentHotFixDisplay(branch) {
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit branch --show-current`);
  console.log("\x1b[33m", `\ngit checkout master`);
  console.log("\x1b[33m", `git merge --no-ff ${branch}`);
  console.log("\x1b[33m", `git branch -d ${branch}`);
}

function HandleErrorDisplay() {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow hotfix start");
  console.log("or: ctflow hotfix finish");
  console.log("\nManage your hotfix branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  CreateHotFixBaseDisplay: CreateHotFixBaseDisplay,
  FinishHotFixByIdAndNameDisplay: FinishHotFixByIdAndNameDisplay,
  FinishCurrentHotFixDisplay: FinishCurrentHotFixDisplay,
  HandleErrorDisplay: HandleErrorDisplay,
};
