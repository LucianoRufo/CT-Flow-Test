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


module.exports = {
    CreateEpicAndPepitoDisplayer: CreateEpicAndPepitoDisplayer,
}