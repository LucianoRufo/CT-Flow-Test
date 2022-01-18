function startDisplay(params) {
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
  console.log("\x1b[33m", `\ngit checkout develop`);
  console.log("\x1b[33m", `\git pull --rebase origin develop`);
  console.log(
    "\x1b[33m",
    `\ngit checkout -b epic/CTDEV-${params.jiraId} develop`
  );
};

module.exports = {
  startDisplay: startDisplay,
};
