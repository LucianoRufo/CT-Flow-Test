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

module.exports = {
  StartDisplay: StartDisplay,
  FinishDisplay: FinishDisplay,
  FinishFromEpicDisplay: FinishFromEpicDisplay,
};
