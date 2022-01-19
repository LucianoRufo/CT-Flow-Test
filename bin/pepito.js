const shell = require("shelljs");

async function start(argv) {
  if (argv.name && argv.jiraId) {

    if (argv.epic) {
      console.log("\x1b[36m%s\x1b[0m", "ALL EPIC BRANCHES:\n");

      let list = await shell
        .exec(`git branch -a | grep epic/CTDEV-`) //Already logs
        .split("\n")
        .map((branch) => branch.trim());
      list.pop();
    
      console.log("\x1b[36m%s\x1b[0m", "\nLocal epics available: ", list, "\n");
      if (list.length !== 0) {
        let spawn = require("child_process").spawn;
        let packagePath = await shell.exec(`npm config get prefix`);
        packagePath = packagePath.trim().replace(/\\/g, "/");
        let shFilePath = `${packagePath}/node_modules/ct-flow/bin/pepito_start.sh`;

        await spawn(
          "sh",
          [
            shFilePath,
            list.toString().replace(/,/g, " "),
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
      if (argv.name.toString().startsWith("pepito/epic-", 0)) {
        let epicName = argv.name.split("/")[1].replace("-", "/CTDEV-");
        let pepitoName = argv.name.split("/")[2];

        if (list.includes(epicName)) {
          console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
          shell.exec(`git checkout ${epicName}`);
          shell.exec(`git fetch`);
          shell.exec(`git pull --rebase origin ${epicName}`);
          shell.exec(
            `git checkout -b pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );
          shell.exec(
            `git push origin ${epicName} pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );

          console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
          console.log("\x1b[33m", `\ngit checkout ${epicName}`);
          console.log("\x1b[33m", `git fetch`);
          console.log("\x1b[33m", `git pull --rebase origin ${epicName}`);
          console.log(
            "\x1b[33m",
            `git checkout -b pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );
          console.log(
            "\x1b[33m",
            `git push origin ${epicName} pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );
        } else {
          console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
          shell.exec(`git checkout develop`);
          shell.exec(`git fetch`);
          shell.exec(`git pull --rebase origin develop`);
          shell.exec(`git checkout -b ${epicName}`);
          shell.exec(`git push origin ${epicName}`);
          shell.exec(
            `git checkout -b pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );
          shell.exec(
            `git push origin pepito/${epicName}/CTDEV-${argv.jiraId}_${pepitoName}`
          );
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
          `git push origin develop pepito/CTDEV-${argv.jiraId}_${argv.name}`
        );
      }
    }
  } else {
    console.log("\x1b[31m", "ERROR: Missing jiraId or name arguments.");
  }
}

async function finish(argv) {
  let validInput = true;
  let epicName;
  let branchName = shell.exec(`git branch --show-current`);

  if (!argv.name) {
    console.log(
      "\x1b[33m",
      "WARNING: Missing name argument, will finish current branch if it is a pepito"
    );
    validInput = false;
  }

  if (validInput) {
    shell.exec(`git checkout ${argv.name}`);
    branchName = argv.name;
  } else {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Finishing current branch:${branchName}\n`
    );
  }

  if (branchName.toString().startsWith("pepito/epic", 0)) {
    let branchNameArray = branchName.toString().split("/");
    epicName = branchNameArray[1].replace("-", "/");
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
  console.log("\nManage your pepito branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  pepitoStart: start,
  pepitoFinish: finish,
  pepitoHandleError: handleError,
};
