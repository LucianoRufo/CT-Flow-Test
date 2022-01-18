const shell = require("shelljs");

function IsFromEpic(params) {
  return params.toString().startsWith("pepito/epic-");
}

function CreatePepitoFromEpic(params) {
  const { epicName, jiraId, pepitoName } = params;
  shell.exec(
    `git checkout -b pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
  shell.exec(
    `git push origin ${epicName} pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
}

function CreatpePepitosBranch(epicName) {
  shell.exec(`git fetch`);
  shell.exec(`git pull --rebase origin develop`);
  shell.exec(`git checkout -b ${epicName}`);
  shell.exec(`git push origin ${epicName}`);
}

function CreatePepito(params) {
  const { jiraId, pepitoName } = params;
  shell.exec(`git checkout aux2`);
  shell.exec(`git fetch`);
  //shell.exec(`git pull --rebase origin develop`);
  shell.exec(`git checkout -b pepito/CTDEV-${jiraId}_${pepitoName}`);
  shell.exec(
    `git push origin develop pepito/CTDEV-${jiraId}_${pepitoName}`
  );
}

module.exports = {
  IsFromEpic: IsFromEpic,
  CreatePepitoFromEpic: CreatePepitoFromEpic,
  CreatpePepitosBranch: CreatpePepitosBranch,
  CreatePepito: CreatePepito,
};
