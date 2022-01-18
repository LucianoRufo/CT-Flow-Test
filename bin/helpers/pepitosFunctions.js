const shell = require("shelljs");

function IsFromEpic(params) {
  params.toString().startsWith("pepito/epic-");
}

function CreatePepitosEpic(params) {
  const { epicName, jiraId, pepitoName } = params;
  shell.exec(
    `git checkout -b pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
  shell.exec(
    `git push origin ${epicName} pepito/${epicName}/CTDEV-${jiraId}_${pepitoName}`
  );
}

module.exports = {
  IsFromEpic: IsFromEpic,
  CreatePepitosEpic: CreatePepitosEpic,
};
