let shell = require("shelljs");

async function start(argv) {
  console.log(argv);
  if (argv.name && argv.jiraId) {
    if (argv.epic) {
      console.log("\x1b[36m%s\x1b[0m", "ALL EPIC BRANCHES:\n");

      let list = await shell
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
        let spawn = require("child_process").spawn;
        let output = await spawn(
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
      shell.exec(`git checkout -b pepito/CTDEV-${argv.jiraId}_${argv.name}`);
      shell.exec(
        `git push origin develop pepito/CTDEV-${argv.jiraId}_${argv.name}`
      );

      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit checkout develop`);
      console.log("\x1b[33m", `git fetch`);
      console.log("\x1b[33m", `git pull --rebase origin develop`);
      console.log(
        "\x1b[33m",
        `git checkout -b pepito/CTDEV-${argv.jiraId}_${argv.name}`
      );
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
  let validInput;
  let epicName;
  let branchName = shell.exec(`git branch --show-current`);

  if (argv.jiraId && !argv.name) {
    console.log("\x1b[31m", "ERROR: Missing complete branch name");
    validInput = false;
  }

  if (validInput) {
    argv.jiraId
      ? shell.exec(`git checkout ${argv.name}`)
      : console.log(
          "\x1b[36m%s\x1b[0m",
          `Finishing current branch:${branchName}\n`
        );
  }

  if (branchName.toString().startsWith("pepito/epic-", 0)) {
    epicName = branchName.toString().split("/")[1].replace("-", "/");
    shell.exec(`git checkout ${epicName}`);
    shell.exec(`git merge --no-ff ${branchName}`);
    shell.exec(`git branch -d ${branchName}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
    console.log("\x1b[33m", `git branch --show-current`);
    console.log("\x1b[33m", `git checkout ${epicName}`);
    console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
    console.log("\x1b[33m", `git branch -d ${branchName}`);
  } else {
    shell.exec(`git checkout develop`);
    shell.exec(`git merge --no-ff ${branchName}`);
    shell.exec(`git branch -d ${branchName}`);
    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
    console.log("\x1b[33m", `git branch --show-current`);
    console.log("\x1b[33m", `git checkout develop`);
    console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
    console.log("\x1b[33m", `git branch -d ${branchName}`);
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
