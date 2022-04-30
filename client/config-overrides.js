const { alias, aliasJest, configPaths } = require('react-app-rewire-alias')

const aliasMap = configPaths('./aliasPaths.json')

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)