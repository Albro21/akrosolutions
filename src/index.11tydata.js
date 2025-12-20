import fs from 'fs';
import path from 'path';

// Get top 3 services and projects from Eleventy collections
export const eleventyComputed = {
  servicesList: data => data.collections.service?.slice(0, 3) || [],
  projectsList: data => data.collections.project?.slice(0, 3) || [],
  softwareImages: () => {
    const softwareDir = path.join(process.cwd(), 'src/assets/images/software');
    return fs.readdirSync(softwareDir)
      .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
      .sort((a, b) => {
        // Sort numerically: software1.png, software2.png, etc.
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        return numA - numB;
      });
  }
};
