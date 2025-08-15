#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Test image paths
const testImages = [
  '/img/team/santhiya-cartoon.webp',
  '/img/team/thangaraj-cartoon.webp',
  '/img/team/amulrajs-cartoon.webp',
  '/img/team/ramya-cartoon.webp',
  '/img/shop/product-1.jpg',
  '/img/placeholder.jpg',
  '/img/logo.png'
];

// Check if images exist in public directory
function checkImages() {
  console.log('🔍 Checking image files...\n');
  
  const publicDir = path.join(__dirname, '../public');
  let allExist = true;
  
  testImages.forEach(imagePath => {
    const fullPath = path.join(publicDir, imagePath);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      console.log(`✅ ${imagePath}`);
    } else {
      console.log(`❌ ${imagePath} - MISSING`);
      allExist = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allExist) {
    console.log('🎉 All test images are present!');
  } else {
    console.log('⚠️  Some images are missing. Please check the paths above.');
  }
  
  return allExist;
}

// Check file sizes
function checkFileSizes() {
  console.log('\n📊 Checking file sizes...\n');
  
  const publicDir = path.join(__dirname, '../public');
  
  testImages.forEach(imagePath => {
    const fullPath = path.join(publicDir, imagePath);
    
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const sizeInKB = (stats.size / 1024).toFixed(2);
      console.log(`${imagePath}: ${sizeInKB} KB`);
    }
  });
}

// Main execution
if (require.main === module) {
  console.log('🧪 Image Loading Test\n');
  
  const imagesExist = checkImages();
  checkFileSizes();
  
  console.log('\n' + '='.repeat(50));
  console.log('💡 Tips for image loading issues:');
  console.log('1. Ensure all images are in the correct public/img/ directory');
  console.log('2. Check that image paths start with / (absolute paths)');
  console.log('3. Verify image formats are supported (jpg, png, webp)');
  console.log('4. Check browser console for network errors');
  console.log('5. Ensure Next.js Image component is properly configured');
  
  process.exit(imagesExist ? 0 : 1);
}

module.exports = { checkImages, checkFileSizes }; 