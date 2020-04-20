/**
 * Internal dependencies
 */
const { spawnScript } = require( './cli' );
const {
	getWebpackArgs,
	hasBabelConfig,
	hasJestConfig,
	hasPrettierConfig,
} = require( './config' );
const {
	buildWordPress,
	downloadWordPressZip,
	mergeYAMLConfigs,
} = require( './env' );
const { fromConfigRoot } = require( './file' );
const { camelCaseDash } = require( './string' );

module.exports = {
	buildWordPress,
	camelCaseDash,
	downloadWordPressZip,
	fromConfigRoot,
	getWebpackArgs,
	hasBabelConfig,
	hasJestConfig,
	hasPrettierConfig,
	mergeYAMLConfigs,
	spawnScript,
};
