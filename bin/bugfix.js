var shell = require("shelljs");

async function start(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(
      `git checkout -b bugfix/CTDEV-${argv.jiraId}_${argv.name} develop`
    );

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log(
      "\x1b[33m",
      `\ngit checkout -b bugfix/CTDEV-${argv.jiraId}_${argv.name} develop`
    );
  }
}

async function publish(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout bugfix/CTDEV-${argv.jiraId}_${argv.name}`);
    shell.exec(`git push origin bugfix/CTDEV-${argv.jiraId}_${argv.name}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log(
      "\x1b[33m",
      `\ngit checkout bugfix/CTDEV-${argv.jiraId}_${argv.name}`
    );
    console.log(
      "\x1b[33m",
      `git push origin bugfix/CTDEV-${argv.jiraId}_${argv.name}`
    );
  }
}

async function finish(argv) {
  if (argv.name && argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
    shell.exec(`git checkout develop`);
    shell.exec(`git merge --no-ff bugfix/CTDEV-${argv.jiraId}_${argv.name}`);
    shell.exec(`git branch -d bugfix/CTDEV-${argv.jiraId}_${argv.name}`);

    console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
    console.log("\x1b[33m", `\ngit checkout develop`);
    console.log(
      "\x1b[33m",
      `git merge --no-ff bugfix/CTDEV-${argv.jiraId}_${argv.name}`
    );
    console.log(
      "\x1b[33m",
      `git branch -d bugfix/CTDEV-${argv.jiraId}_${argv.name}`
    );
  } else if (!argv.name && !argv.jiraId) {
    console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
    var output = shell.exec(`git branch --show-current`);

    if (output.toString().startsWith("bugfix/CTDEV-", 0)) {
      shell.exec(`git checkout develop`);
      shell.exec(`git merge --no-ff ${output}`);
      shell.exec(`git branch -d ${output}`);
      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", `\ngit branch --show-current`);
      console.log("\x1b[33m", `\ngit checkout develop`);
      console.log("\x1b[33m", `git merge --no-ff ${output}`);
      console.log("\x1b[33m", `git branch -d ${output}`);
    } else {
      console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON A BUGFIX BRANCH");
    }
  }
}

async function handleError(argv) {
  console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
  console.log("\x1b[37m", "\nusage: ctflow bugfix start");
  console.log("or: ctflow bugfix finish");
  console.log("or: ctflow bugfix publish");
  console.log("\nManage your bugfix branches.");
  console.log("For more specific help type the command followed by --help");
}

module.exports = {
  bugfixStart: start,
  bugfixPublish: publish,
  bugfixFinish: finish,
  bugfixHandleError: handleError,
};
