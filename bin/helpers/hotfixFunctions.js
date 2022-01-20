const shell = require("shelljs");
const { MoveToBranch, MoveToDevelop } = require("./movers");
const { GetLogsFromHotFixStart } = require("./gitFunctions");
const {
  CreateHotFixBaseDisplay,
  FinishHotFixByIdAndNameDisplay,
  FinishCurrentHotFixDisplay
} = require("./hotfixDisplayer");

async function CreateHotFixAndPushItToRemote(argv) {
  const { name, jiraId } = argv;
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  shell.exec(`git checkout master`);
  shell.exec(`git pull --rebase origin master`);
  shell.exec(`git checkout -b hotfix/CTDEV-${jiraId}_${name} master`);
  shell.exec(`git push origin hotfix/CTDEV-${jiraId}_${name}`);
  CreateHotFixBaseDisplay(argv);
}

async function FinishHotFixByIdAndName(argv) {
  const { name, jiraId, noDev } = argv;
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  shell.exec(`git checkout master`);
  shell.exec(`git merge --no-ff hotfix/CTDEV-${jiraId}_${name}`);

  if (!noDev) {
    MoveToBranch(`hotfix/CTDEV-${jiraId}_${name}`);
    let { storyPoint } = await GetLogsFromHotFixStart(argv);
    shell.exec(`git rebase -i ${storyPoint}`);
    storyPoint = await GetLogsFromHotFixStart(argv, true);
    MoveToDevelop();
    shell.exec(`git cherry-pick ${storyPoint.storyPoint}`);
    shell.exec(`git branch -d hotfix/CTDEV-${jiraId}_${name}`);
  } else {
    shell.exec(`git branch -d hotfix/CTDEV-${jiraId}_${name}`);
  }
  FinishHotFixByIdAndNameDisplay(argv);
}

function FinishCurrentHotfix() {
  console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
  let branchName = shell.exec(`git branch --show-current`);

  if (branchName.toString().startsWith("hotfix/CTDEV-", 0)) {
    shell.exec(`git checkout master`);
    shell.exec(`git merge --no-ff ${branchName}`);
    shell.exec(`git branch -d ${branchName}`);
    FinishCurrentHotFixDisplay(branchName);
  } else {
    console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON A HOTFIX BRANCH");
  }
}

module.exports = {
  FinishHotFixByIdAndName: FinishHotFixByIdAndName,
  CreateHotFixAndPushItToRemote: CreateHotFixAndPushItToRemote,
  FinishCurrentHotfix: FinishCurrentHotfix,
};
