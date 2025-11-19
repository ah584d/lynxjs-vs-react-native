// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add monorepo support
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');


module.exports = config;
