var shell = require("shelljs");

async function start(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "ALL EPIC BRANCHES:\n");

    var list = await shell
      .exec(`git branch -a | grep epic/`)
      .split("\n")
      .map((branch) => branch.trim())
      .filter(
        (branch) =>
          branch.includes("epic/CTDEV-") &&
          branch.lastIndexOf("epic/CTDEV-") === 0
      );

    console.log("\x1b[36m%s\x1b[0m", "\nLocal epics available: ", list, "\n");
    if (list.length !== 0) {
      var spawn = require("child_process").spawn;
      var output = await spawn(
        "sh",
        [
          `./bin/story_start.sh`,
          list.toString().replace(",", " "),
          argv.jiraId,
          argv.name,
        ],
        {
          stdio: "inherit",
        }
      );
    } else {
      console.log("\x1b[31m", "ERROR: There are no epics");
    }
  }
}

async function publish(argv) {}

async function finish(argv) {
  console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
  var output = shell.exec(`git branch --show-current`);

  if (output.toString().startsWith("story/CTDEV-", 0)) {
    shell.exec(`git checkout develop`);
    shell.exec(`git merge --no-ff ${output}`);
    shell.exec(`git branch -d ${output}`);
    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
    console.log("\x1b[33m", `git branch --show-current`);
    console.log("\x1b[33m", `git checkout develop`);
    console.log("\x1b[33m", `git merge --no-ff ${output}`);
    console.log("\x1b[33m", `git branch -d ${output}`);
  } else {
    console.log("\x1b[31m", "\nYOU ARE NOT ON A STORY BRANCH\n");
    console.log("\x1b[36m%s\x1b[0m", "ALL STORY BRANCHES:\n");

    var list = await shell
      .exec(`git branch -a | grep story/`)
      .split("\n")
      .map((branch) => branch.trim())
      .filter(
        (branch) =>
          branch.includes("story/CTDEV-") &&
          branch.lastIndexOf("story/CTDEV-") === 0
      );

    console.log("\x1b[36m%s\x1b[0m", "\nLocal stories available: ", list, "\n");

    if (list.length !== 0) {
      var spawn = require("child_process").spawn;
      var output = await spawn(
        "sh",
        [`./bin/story_finish.sh`, list.toString().replace(",", " ")],
        {
          stdio: "inherit",
        }
      );
    } else {
      console.log("\x1b[31m", "ERROR: There are no story branches");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow story start");
  console.log("or: ctflow story finish");
  console.log("or: ctflow story publish");
  console.log("\nManage your story branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  storyStart: start,
  storyFinish: finish,
  storyHandleError: handleError,
};
