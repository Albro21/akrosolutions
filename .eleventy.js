import fs from "fs";
import path from "path";

export default function(eleventyConfig) {
  // Helper to order collections by array from data
  function orderByArray(collection, orderArray, slugKey = "fileSlug") {
    if (!Array.isArray(collection) || !Array.isArray(orderArray)) return collection;
    const orderMap = new Map(orderArray.map((slug, idx) => [slug, idx]));
    return collection.slice().sort((a, b) => {
      const aSlug = a.data && a.data[slugKey] ? a.data[slugKey] : a[slugKey] || a.fileSlug;
      const bSlug = b.data && b.data[slugKey] ? b.data[slugKey] : b[slugKey] || b.fileSlug;
      const aIdx = orderMap.has(aSlug) ? orderMap.get(aSlug) : 9999;
      const bIdx = orderMap.has(bSlug) ? orderMap.get(bSlug) : 9999;
      return aIdx - bIdx;
    });
  }

  // Helper to read order arrays from JSON files
  function readOrderArray(filename) {
    const filePath = path.resolve("src/_data", filename);
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  // Globally order 'service' collection
  eleventyConfig.addCollection("service", function(collectionApi) {
    const order = readOrderArray("serviceOrder.json");
    const items = collectionApi.getFilteredByGlob("src/services/*.njk");
    return orderByArray(items, order, "fileSlug");
  });

  // Globally order 'project' collection
  eleventyConfig.addCollection("project", function(collectionApi) {
    const order = readOrderArray("projectOrder.json");
    const items = collectionApi.getFilteredByGlob("src/projects/*.njk");
    return orderByArray(items, order, "fileSlug");
  });

  // Globally order 'bim-packages' collection
  eleventyConfig.addCollection("bim-packages", function(collectionApi) {
    const order = readOrderArray("packagesOrder.json");
    const items = collectionApi.getFilteredByGlob("src/bim-packages/*.njk");
    return orderByArray(items, order, "fileSlug");
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addGlobalData("site", {
    lastModified: new Date().toISOString().split('T')[0]
  });

  // Custom filter to order collection by array from data
  eleventyConfig.addNunjucksFilter("orderByArray", function(collection, orderArray, slugKey = "fileSlug") {
    if (!Array.isArray(collection) || !Array.isArray(orderArray)) return collection;
    const orderMap = new Map(orderArray.map((slug, idx) => [slug, idx]));
    return collection.slice().sort((a, b) => {
      const aSlug = a.data && a.data[slugKey] ? a.data[slugKey] : a[slugKey] || a.fileSlug;
      const bSlug = b.data && b.data[slugKey] ? b.data[slugKey] : b[slugKey] || b.fileSlug;
      const aIdx = orderMap.has(aSlug) ? orderMap.get(aSlug) : 9999;
      const bIdx = orderMap.has(bSlug) ? orderMap.get(bSlug) : 9999;
      return aIdx - bIdx;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};