//#TODO: make this to receive a function as call back with te comands runned to format it like:
//       Comands run:
//           comand a
//           comand b
//           comand c
//       Output:
//           result from the function that has been runed (usually git feedback)
function BaseMessage() {
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  console.log("\x1b[36m%s\x1b[0m", "COMMANDS RUN:");
}

function CurrentBranchMessage() {
  console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
}

module.exports = {
  BaseMessage: BaseMessage,
  CurrentBranchMessage: CurrentBranchMessage
};
