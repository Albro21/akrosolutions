import fs from "fs";
import path from "path";

export default {
  eleventyComputed: {
    servicesList: data => (data.collections.service).slice(0, 3),
    projectsList: data => (data.collections.project).slice(0, 3),
    softwareImages: () => {
      const dir = path.join('src/assets/images/software');
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    }
  }
};
