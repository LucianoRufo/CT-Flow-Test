let shell = require("shelljs");

async function start(argv) {
  if (argv.tag) {
    console.log("\x1b[36m%s\x1b[0m", "RELEASES LIST:\n");

    let list = await shell
      .exec(`git branch -a | grep releases/`)
      .split("\n")
      .map((branch) => branch.trim());
    list.pop();

    if (
      list.includes(`releases/${argv.tag}`) ||
      list.includes(`remotes/origin/releases/${argv.tag}`)
    ) {
      console.log("\x1b[31m", "\nERROR: THE TAG YOU INDICATED ALREADY EXISTS");
    } else {
      console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
      shell.exec(`git checkout master`);
      shell.exec(`git pull --rebase origin master`);
      shell.exec(`git checkout -b releases/${argv.tag} master`);

      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit checkout master`);
      console.log("\x1b[33m", `\ngit pull --rebase origin master`);
      console.log("\x1b[33m", `\ngit checkout -b releases/${argv.tag} master`);
    }
  }
}

async function finish(argv) {
  if (argv.tag) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout master`);
    shell.exec(`git merge --no-ff releases/${argv.tag}`);
    shell.exec(`git branch -d releases/${argv.tag}`);
    shell.exec(`git tag ${argv.tag}`);
    shell.exec(`git push --tags`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log("\x1b[33m", `\ngit checkout master`);
    console.log("\x1b[33m", `git merge --no-ff releases/${argv.tag}`);
    console.log("\x1b[33m", `git branch -d releases/${argv.tag}`);
    console.log("\x1b[33m", `git tag ${argv.tag}`);
    console.log("\x1b[33m", `git push --tags`);
  } else {
    console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
    let branchName = shell.exec(`git branch --show-current`);

    if (branchName.toString().startsWith("releases/", 0)) {
      let tag = branchName.split("/")[1];

      shell.exec(`git checkout master`);
      shell.exec(`git merge --no-ff ${branchName}`);
      shell.exec(`git branch -d ${branchName}`);
      shell.exec(`git tag ${tag}`);
      shell.exec(`git push --tags`);

      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit branch --show-current`);
      console.log("\x1b[33m", `\ngit checkout master`);
      console.log("\x1b[33m", `git merge --no-ff ${branchName}`);
      console.log("\x1b[33m", `git branch -d ${branchName}`);
      console.log("\x1b[33m", `git tag ${tag}`);
      console.log("\x1b[33m", `git push --tags`);
    } else {
      console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON A releases BRANCH");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow releases start");
  console.log("or: ctflow releases finish");
  console.log("\nManage your releases branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  releaseStart: start,
  releaseFinish: finish,
  releaseHandleError: handleError,
};
