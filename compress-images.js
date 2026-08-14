const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images');
if (!fs.existsSync(dir)) {
  console.log("Directory not found:", dir);
  process.exit(0);
}

const files = fs.readdirSync(dir);

async function optimizeFiles() {
  let optimizedCount = 0;
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      // If file is > 1MB (1048576 bytes)
      if (stat.size > 1024 * 1024) {
        console.log(`\nCompressing: ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
        
        try {
          const tempPath = filePath + '.tmp';
          
          if (file.endsWith('.png')) {
            await sharp(filePath)
              .resize({ width: 1920, withoutEnlargement: true })
              .png({ quality: 80, compressionLevel: 8 }) // Compress PNG
              .toFile(tempPath);
          } else {
            await sharp(filePath)
              .resize({ width: 1920, withoutEnlargement: true })
              .jpeg({ quality: 80, progressive: true })
              .toFile(tempPath);
          }
          
          // Overwrite original
          fs.renameSync(tempPath, filePath);
          
          const newSize = fs.statSync(filePath).size;
          console.log(`Success! New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
          optimizedCount++;
        } catch (err) {
          console.error(`Failed to compress ${file}:`, err);
        }
      }
    }
  }
  
  console.log(`\nFinished! Optimized ${optimizedCount} large files.`);
}

optimizeFiles();
