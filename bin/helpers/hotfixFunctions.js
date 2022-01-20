const shell = require("shelljs");
const { MoveToBranch } = require("./movers");
const {GetLogsFromHotFixStart} = require("./gitFunctions")

async function FinishHotFixByIdAndName({ jiraId, name, noDev }) {
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  shell.exec(`git checkout master`);
  shell.exec(`git merge --no-ff hotfix/CTDEV-${jiraId}_${name}`);

  if (!noDev) {
    MoveToBranch(`hotfix/CTDEV-${jiraId}_${name}`);
    let { storyPoint } = await GetLogsFromHotFixStart({argv});
    console.log(storyPoint);
    shell.exec(`git rebase -i ${storyPoint}`);
    storyPoint = await GetLogsFromHotFixStart(argv, true);
    shell.exec(
      "git checkout pepito/epic/CTDEV-69/CTDEV-69_hotFixesAndReleases"
    );
    shell.exec(`git cherry-pick ${storyPoint.storyPoint}`);
    shell.exec(`git branch -d hotfix/CTDEV-${jiraId}_${name}`);
  } else {
    shell.exec(`git branch -d hotfix/CTDEV-${jiraId}_${name}`);
  }
}

module.exports = {
  FinishHotFixByIdAndName: FinishHotFixByIdAndName,
};
