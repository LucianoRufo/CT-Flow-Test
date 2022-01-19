const shell = require("shelljs");
const {MoveToBranch} = require("./helpers/movers")

async function start(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    shell.exec(`git pull --rebase origin master`);
    shell.exec(
      `git checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
    );

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log("\x1b[33m", `\ngit checkout master`);
    console.log("\x1b[33m", `\ngit pull --rebase origin master`);
    console.log(
      "\x1b[33m",
      `\ngit checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
    );
  }
}

async function finish(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    shell.exec(`git merge --no-ff hotfix/CTDEV-${argv.jiraId}_${argv.name}`);


    if(true) {
      MoveToBranch(`hotfix/CTDEV-${argv.jiraId}_${argv.name}`)
      let data = await shell.exec(`git log --walk-reflogs hotfix/CTDEV-${argv.jiraId}_${argv.name}`)
      console.log('---------------------',data.stdout)
      console.log('---------------------')
    }



  //   //shell.exec(`git branch -d hotfix/CTDEV-${argv.jiraId}_${argv.name}`);

  //   console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  //   console.log("\x1b[33m", `\ngit checkout master`);
  //   console.log(
  //     "\x1b[33m",
  //     `git merge --no-ff hotfix/CTDEV-${argv.jiraId}_${argv.name}`
  //   );
  //   console.log(
  //     "\x1b[33m",
  //     `git branch -d hotfix/CTDEV-${argv.jiraId}_${argv.name}`
  //   );
  // } else if (!argv.name && !argv.jiraId) {
  //   console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
  //   let branchName = shell.exec(`git branch --show-current`);

  //   if (branchName.toString().startsWith("hotfix/CTDEV-", 0)) {
  //     shell.exec(`git checkout master`);
  //     shell.exec(`git merge --no-ff ${branchName}`);
  //     shell.exec(`git branch -d ${branchName}`);
  //     console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  //     console.log("\x1b[33m", `\ngit branch --show-current`);
  //     console.log("\x1b[33m", `\ngit checkout master`);
  //     console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
  //     console.log("\x1b[33m", `git branch -d ${branchName}`);
  //   } else {
  //     console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON A HOTFIX BRANCH");
  //   }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow hotfix start");
  console.log("or: ctflow hotfix finish");
  console.log("\nManage your hotfix branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  hotfixStart: start,
  hotfixFinish: finish,
  hotfixHandleError: handleError,
};
