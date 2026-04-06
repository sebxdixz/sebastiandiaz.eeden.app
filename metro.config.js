const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for web
config.resolver.sourceExts.push('web.js', 'web.jsx', 'web.ts', 'web.tsx');

// Optimize for Reanimated
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
};

module.exports = config;
