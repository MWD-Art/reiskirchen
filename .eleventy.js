const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const esbuild = require('esbuild');
module.exports = function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: ['src/js/index.js'],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: 'public/js/index.js',
    });
  });

  eleventyConfig.addNunjucksFilter('limit', (arr, limit) =>
    arr.slice(0, limit)
  );

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventySass);

  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./src/js');

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
