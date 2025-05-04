/**
 * Este script optimiza automáticamente las imágenes para la web
 * Convierte las imágenes a formato WebP y optimiza su tamaño
 * Para usarlo: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Verificar si Sharp está instalado
try {
  require.resolve('sharp');
} catch (e) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Sharp no está instalado. Por favor, instálalo con: npm install sharp --save-dev');
  process.exit(1);
}

const sharp = require('sharp');

// Directorios para procesar
const sourceDir = path.join(__dirname, '../public/img');
const outputDir = path.join(__dirname, '../public/img/optimized');

// Verificar que los directorios existan
if (!fs.existsSync(sourceDir)) {
  console.error('\x1b[31m%s\x1b[0m', `Error: El directorio de origen no existe: ${sourceDir}`);
  process.exit(1);
}

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuraciones por tipo de imagen
const configs = {
  // Imágenes de héroes y banners (más grandes)
  hero: {
    width: 1200,
    quality: 80
  },
  // Imágenes de cards, servicios, recursos
  card: {
    width: 600, 
    quality: 75
  },
  // Imágenes de equipo, testimonios
  portrait: {
    width: 400,
    quality: 80
  },
  // Imágenes pequeñas, iconos
  icon: {
    width: 150,
    quality: 70
  }
};

// Extensiones de imagen a procesar
const extensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Función para determinar la configuración basada en el nombre de archivo o directorio
function getConfigType(filePath) {
  const fileName = path.basename(filePath).toLowerCase();
  const dirName = path.dirname(filePath).toLowerCase();
  
  if (
    fileName.includes('hero') ||
    fileName.includes('banner') ||
    dirName.includes('hero') ||
    dirName.includes('banner')
  ) {
    return 'hero';
  } else if (
    fileName.includes('team') ||
    fileName.includes('person') ||
    fileName.includes('testimonial') ||
    dirName.includes('team') ||
    dirName.includes('testimonials')
  ) {
    return 'portrait';
  } else if (
    fileName.includes('icon') ||
    dirName.includes('icon')
  ) {
    return 'icon';
  } else {
    return 'card'; // Configuración predeterminada
  }
}

// Función recursiva para procesar los archivos en directorios y subdirectorios
async function processDirectory(directory, basePath = '') {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const relPath = path.join(basePath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Crear directorio correspondiente en el output
      const newOutputPath = path.join(outputDir, relPath);
      if (!fs.existsSync(newOutputPath)) {
        fs.mkdirSync(newOutputPath, { recursive: true });
      }
      
      // Procesar subdirectorio
      await processDirectory(filePath, relPath);
    } else {
      // Procesar archivo si es una imagen
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        // Determinar configuración basada en el nombre/ubicación
        const configType = getConfigType(filePath);
        const config = configs[configType];
        
        const targetWebp = path.join(outputDir, relPath.replace(ext, '.webp'));
        const targetOriginal = path.join(outputDir, relPath);
        
        await optimizeImage(filePath, targetWebp, targetOriginal, config);
      }
    }
  }
}

// Función para optimizar una imagen individual
async function optimizeImage(source, targetWebp, targetOriginal, config) {
  try {
    // Crear directorio de destino si no existe
    const targetDir = path.dirname(targetWebp);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Crear versión WebP
    await sharp(source)
      .resize(config.width)
      .webp({ quality: config.quality })
      .toFile(targetWebp);
    
    // Crear versión optimizada en formato original
    const ext = path.extname(source).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(source)
        .resize(config.width)
        .jpeg({ quality: config.quality })
        .toFile(targetOriginal);
    } else if (ext === '.png') {
      await sharp(source)
        .resize(config.width)
        .png({ quality: config.quality })
        .toFile(targetOriginal);
    } else {
      // Copiar formatos no soportados directamente
      fs.copyFileSync(source, targetOriginal);
    }
    
    console.log(`✅ Optimizada: ${source} -> ${targetWebp}`);
  } catch (error) {
    console.error(`❌ Error al procesar: ${source}`, error);
  }
}

// Iniciar procesamiento
console.log('\x1b[36m%s\x1b[0m', '🔎 Iniciando optimización de imágenes...');
processDirectory(sourceDir)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✅ Optimización de imágenes completada con éxito!');
    console.log('\x1b[33m%s\x1b[0m', `💡 Las imágenes optimizadas están en: ${outputDir}`);
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error durante la optimización:', err);
  }); 