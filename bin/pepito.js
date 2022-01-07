var shell = require("shelljs");

async function start(argv) {
  console.log(argv);
  if (argv.name && argv.jiraId) {
    if (argv.epic) {
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
            `./bin/pepito_start.sh`,
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
    } else {
      console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
      shell.exec(`git checkout develop`);
      shell.exec(`git fetch`);
      shell.exec(`git pull --rebase origin develop`);
      shell.exec(`git checkout -b `);
      shell.exec(
        `git push origin develop pepito/CTDEV-${argv.jiraId}_${argv.name}`
      );

      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit checkout develop`);
      console.log("\x1b[33m", `git fetch`);
      console.log("\x1b[33m", `git pull --rebase origin develop`);
      console.log("\x1b[33m", `git checkout -b`);
      console.log(
        "\x1b[33m",
        `git push origin develop pepito/${argv.jiraId}_${argv.name}`
      );
    }
  } else {
    console.log("\x1b[31m", "ERROR: Missing jiraId or name arguments.");
  }
}

async function publish(argv) {}

async function finish(argv) {
  console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
  var output = shell.exec(`git branch --show-current`);

  if (output.toString().startsWith("pepito/CTDEV-", 0)) {
    shell.exec(`git checkout develop`);
    shell.exec(`git merge --no-ff ${output}`);
    shell.exec(`git branch -d ${output}`);
    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
    console.log("\x1b[33m", `git branch --show-current`);
    console.log("\x1b[33m", `git checkout develop`);
    console.log("\x1b[33m", `git merge --no-ff ${output}`);
    console.log("\x1b[33m", `git branch -d ${output}`);
  } else {
    console.log("\x1b[31m", "\nYOU ARE NOT ON A pepito BRANCH\n");
    console.log("\x1b[36m%s\x1b[0m", "ALL pepito BRANCHES:\n");

    var list = await shell
      .exec(`git branch -a | grep pepito/`)
      .split("\n")
      .map((branch) => branch.trim())
      .filter(
        (branch) =>
          branch.includes("pepito/CTDEV-") &&
          branch.lastIndexOf("pepito/CTDEV-") === 0
      );

    console.log("\x1b[36m%s\x1b[0m", "\nLocal stories available: ", list, "\n");

    if (list.length !== 0) {
      var spawn = require("child_process").spawn;
      var output = await spawn(
        "sh",
        [`./bin/pepito_finish.sh`, list.toString().replace(",", " ")],
        {
          stdio: "inherit",
        }
      );
    } else {
      console.log("\x1b[31m", "ERROR: There are no pepito branches");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow pepito start");
  console.log("or: ctflow pepito finish");
  console.log("or: ctflow pepito publish");
  console.log("\nManage your pepito branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  pepitoStart: start,
  pepitoFinish: finish,
  pepitoHandleError: handleError,
};
