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
  const { jiraId, name } = params;
  shell.exec(`git checkout develop`);
  shell.exec(`git fetch`);
  shell.exec(`git pull --rebase origin develop`);
  shell.exec(`git checkout -b pepito/CTDEV-${jiraId}_${name}`);
  shell.exec(`git push origin develop pepito/CTDEV-${jiraId}_${name}`);
}

function FinishPepito(pepito) {
  shell.exec(`git merge --no-ff ${pepito}`);
  shell.exec(`git branch -d ${pepito}`);
}

module.exports = {
  IsFromEpic: IsFromEpic,
  CreatePepitoFromEpic: CreatePepitoFromEpic,
  CreatpePepitosBranch: CreatpePepitosBranch,
  CreatePepito: CreatePepito,
  FinishPepito: FinishPepito,
};
