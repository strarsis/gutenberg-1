/**
 * Internal dependencies
 */
const { spawnScript } = require( './cli' );
const { getWebpackArgs } = require( './config' );
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
	mergeYAMLConfigs,
	spawnScript,
};
