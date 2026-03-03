module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  var getPages = function (collectionApi) {
    return [
      ...collectionApi.getFilteredByGlob("src/pages/*.md"),
      ...collectionApi.getFilteredByGlob("src/pages/*.njk")
    ];
  };

  eleventyConfig.addCollection("navPages", function (collectionApi) {
    return getPages(collectionApi)
      .filter((item) => item.data.navOrder !== undefined)
      .sort((a, b) => a.data.navOrder - b.data.navOrder);
  });

  eleventyConfig.addCollection("sitemapPages", function (collectionApi) {
    return getPages(collectionApi)
      .filter((item) => item.url && item.url !== "/404.html");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
