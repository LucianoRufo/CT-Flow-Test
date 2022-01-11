let shell = require("shelljs");

async function start(argv) {
  if (argv.tag) {
    console.log("\x1b[36m%s\x1b[0m", "RELEASE LIST:\n");

    let list = await shell
      .exec(`git branch -a | grep release/`)
      .split("\n")
      .map((branch) => branch.trim());
    list.pop();

    if (
      list.includes(`release/${argv.tag}`) ||
      list.includes(`remotes/origin/release/${argv.tag}`)
    ) {
      console.log("\x1b[31m", "\nERROR: THE TAG YOU INDICATED ALREADY EXISTS");
    } else {
      console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
      shell.exec(`git checkout master`);
      shell.exec(`git pull --rebase origin master`);
      shell.exec(`git checkout -b release/${argv.tag} master`);

      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit checkout master`);
      console.log("\x1b[33m", `\ngit pull --rebase origin master`);
      console.log("\x1b[33m", `\ngit checkout -b release/${argv.tag} master`);
    }
  }
}

async function finish(argv) {
  if (argv.tag) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    shell.exec(`git merge --no-ff release/${argv.tag}`);
    shell.exec(`git branch -d release/${argv.tag}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log("\x1b[33m", `\ngit checkout master`);
    console.log("\x1b[33m", `git merge --no-ff release/${argv.tag}`);
    console.log("\x1b[33m", `git branch -d release/${argv.tag}`);
  } else {
    console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
    let branchName = shell.exec(`git branch --show-current`);

    if (branchName.toString().startsWith("release/", 0)) {
      shell.exec(`git checkout master`);
      shell.exec(`git merge --no-ff ${branchName}`);
      shell.exec(`git branch -d ${branchName}`);
      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit branch --show-current`);
      console.log("\x1b[33m", `\ngit checkout master`);
      console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
      console.log("\x1b[33m", `git branch -d ${branchName}`);
    } else {
      console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON A release BRANCH");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow release start");
  console.log("or: ctflow release finish");
  console.log("\nManage your release branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  releaseStart: start,
  releaseFinish: finish,
  releaseHandleError: handleError,
};
