function IsFromEpic(params) {
  params.name.toString().startsWith("pepito/epic-", 0);
}

module.exports = {
  IsFromEpic: IsFromEpic,
};
