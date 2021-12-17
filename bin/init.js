var shell = require("shelljs");

module.exports = function init({ flag }) {
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  shell.exec("git init");
  shell.exec(
    `git commit --allow-empty -m "Initializing ctflow enabled repo...."`
  );
  shell.exec("git checkout -b develop master");

  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", "git init");
  console.log(
    "\x1b[33m",
    "git commit --allow-empty -m Initializing ct-flow...."
  );
  console.log("\x1b[33m", "git checkout -b develop master");
};
