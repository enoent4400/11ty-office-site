const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');
const fs = require("fs");
const NOT_FOUND_PATH = "public/404.html";


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/revolution');
  // Plugins
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en',
    },
  });

  // Browsersync
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (req.url === '/') {
            res.writeHead(302, {
              location: '/en/',
            });
            res.end();
          }
					else if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          } else {
						const content_404 = fs.readFileSync(NOT_FOUND_PATH);
						// Add 404 http status code in request header.
						res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
						// Provides the 404 content without redirect.
						res.write(content_404);
						res.end();
					}
        });
      },
    },
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
