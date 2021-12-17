var shell = require("shelljs");

async function start(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(
      `git checkout -b epic/CTDEV-${argv.jiraId}_${argv.name} develop`
    );

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log(
      "\x1b[33m",
      `\ngit checkout -b epic/CTDEV-${argv.jiraId}_${argv.name} develop`
    );
  }
}

async function publish(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout epic/CTDEV-${argv.jiraId}_${argv.name}`);
    shell.exec(`git push origin epic/CTDEV-${argv.jiraId}_${argv.name}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log(
      "\x1b[33m",
      `\ngit checkout epic/CTDEV-${argv.jiraId}_${argv.name}`
    );
    console.log(
      "\x1b[33m",
      `git push origin epic/CTDEV-${argv.jiraId}_${argv.name}`
    );
  }
}

async function finish(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout develop`);
    shell.exec(`git merge --no-ff epic/CTDEV-${argv.jiraId}_${argv.name}`);
    shell.exec(`git branch -d epic/CTDEV-${argv.jiraId}_${argv.name}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:\n");
    console.log("\x1b[33m", `git checkout develop`);
    console.log(
      "\x1b[33m",
      `git merge --no-ff epic/CTDEV-${argv.jiraId}_${argv.name}`
    );
    console.log(
      "\x1b[33m",
      `git branch -d epic/CTDEV-${argv.jiraId}_${argv.name}`
    );
  } else if (!argv.name && !argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
    var output = shell.exec(`git branch --show-current`);

    if (output.toString().startsWith("epic/CTDEV-", 0)) {
      shell.exec(`git checkout develop`);
      shell.exec(`git merge --no-ff ${output}`);
      shell.exec(`git branch -d ${output}`);
      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit branch --show-current`);
      console.log("\x1b[33m", `\ngit checkout develop`);
      console.log("\x1b[33m", `git merge --no-ff ${output}`);
      console.log("\x1b[33m", `git branch -d ${output}`);
    } else {
      console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON AN EPIC BRANCH");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow epic start");
  console.log("or: ctflow epic finish");
  console.log("or: ctflow epic publish");
  console.log("\nManage your epic branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  epicStart: start,
  epicPublish: publish,
  epicFinish: finish,
  epicHandleError: handleError,
};
