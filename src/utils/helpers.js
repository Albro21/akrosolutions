import fs from 'fs';
import path from 'path';

// Load services detail data from individual JSON files
export function loadServicesData() {
  const servicesDir = path.join(process.cwd(), 'src/_data/services');
  const imagesDir = path.join(process.cwd(), 'src/assets/images/services');

  const serviceFiles = fs.readdirSync(servicesDir).filter(file => file.endsWith('.json'));
  const services = {};

  serviceFiles.forEach(file => {
    const serviceKey = path.basename(file, '.json');
    const servicePath = path.join(servicesDir, file);
    const serviceData = JSON.parse(fs.readFileSync(servicePath, 'utf8'));

    const serviceImagesDir = path.join(imagesDir, serviceKey);
    let images = [];

    if (fs.existsSync(serviceImagesDir)) {
      images = fs.readdirSync(serviceImagesDir)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        .sort();
    }

    serviceData.slideshow = images;
    services[serviceKey] = serviceData;
  });

  return services;
}

// Load BIM packages array from bim-packages.json
export function loadBimPackagesArray() {
  const packagesPath = path.join(process.cwd(), 'src/_data/bim-packages.json');
  const packages = JSON.parse(fs.readFileSync(packagesPath, 'utf8'));
  return packages;
}

// Load software images array from software folder
export function loadSoftwareImages() {
  const softwareDir = path.join(process.cwd(), 'src/assets/images/software');
  const images = fs.readdirSync(softwareDir)
    .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
    .sort((a, b) => {
      // Sort numerically: software1.png, software2.png, etc.
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  return images;
}