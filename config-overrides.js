/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
const rewireAliases = require('react-app-rewire-aliases')
const { useBabelRc } = require('customize-cra')
const { paths } = require('react-app-rewired')
const path = require('path')

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@': path.resolve(__dirname, `${paths.appSrc}/`)
  })(config, env)

  config = useBabelRc()(config)

  return config
}
