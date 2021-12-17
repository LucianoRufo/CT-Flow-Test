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

module.exports = {
  start: start,
};
