const shell = require("shelljs");
const { MoveToBranch } = require("./helpers/movers");


async function start(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    shell.exec(`git pull --rebase origin master`);
    shell.exec(
      `git checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
    );
    shell.exec(`git push origin hotfix/CTDEV-${argv.jiraId}_${argv.name}`);
    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log("\x1b[33m", `\ngit checkout master`);
    console.log("\x1b[33m", `\ngit pull --rebase origin master`);
    console.log(
      "\x1b[33m",
      `\ngit checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
    );
    console.log(
      "\x1b[33m",
      `\ngit push origin hotfix/CTDEV-${argv.jiraId}_${argv.name}`
    );
  }
}

async function finish(argv) {
  const { name, jiraId, noDev } = argv;
  if (name && jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    //shell.exec(`git merge --no-ff hotfix/CTDEV-${argv.jiraId}_${argv.name}`);

    if (noDev) {
      shell.exec(`git branch -d hotfix/CTDEV-${argv.jiraId}_${argv.name}`);
      
    } else {
      MoveToBranch(`hotfix/CTDEV-${argv.jiraId}_${argv.name}`);
      let data = await shell.exec(
        `git log --walk-reflogs --oneline hotfix/CTDEV-${argv.jiraId}_${argv.name}`
      );
      console.log("---------------------", data.stdout.toString().split("\n").split(' ')[0]);
      console.log("---------------------");
      // console.log("---------------------", data);
      // console.log("---------------------");
    }
//default to develop cherry pick, --noDev
//move to develop and cherry picck from first commit and
// then nuke the branch 

    //   //

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
