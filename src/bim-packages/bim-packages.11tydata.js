import fs from "fs";
import path from "path";

export default {
  eleventyComputed: {
    images: data => {
      const dir = path.join("src/assets/images/bim-packages", data.page.fileSlug);
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir)
        .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .sort();
    }
  }
};
