/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

console.log('📦 Post-build: Copying necessary files...');

// Copy public folder
const publicSrc = path.join(__dirname, '../public');
const publicDest = path.join(__dirname, '../.next/standalone/public');

if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('✅ Public folder copied');
}

// Copy .next/static folder
const staticSrc = path.join(__dirname, '../.next/static');
const staticDest = path.join(__dirname, '../.next/standalone/.next/static');

if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('✅ Static folder copied');
}

// Copy prisma folder
const prismaSrc = path.join(__dirname, '../prisma');
const prismaDest = path.join(__dirname, '../.next/standalone/prisma');

if (fs.existsSync(prismaSrc)) {
  fs.cpSync(prismaSrc, prismaDest, { recursive: true });
  console.log('✅ Prisma folder copied');
}

// Copy node_modules/@prisma/client
const prismaClientSrc = path.join(__dirname, '../node_modules/@prisma/client');
const prismaClientDest = path.join(__dirname, '../.next/standalone/node_modules/@prisma/client');

if (fs.existsSync(prismaClientSrc)) {
  fs.mkdirSync(path.dirname(prismaClientDest), { recursive: true });
  fs.cpSync(prismaClientSrc, prismaClientDest, { recursive: true });
  console.log('✅ Prisma client copied');
}

// Copy .prisma folder (generated Prisma client)
const prismaGeneratedSrc = path.join(__dirname, '../node_modules/.prisma');
const prismaGeneratedDest = path.join(__dirname, '../.next/standalone/node_modules/.prisma');

if (fs.existsSync(prismaGeneratedSrc)) {
  fs.mkdirSync(path.dirname(prismaGeneratedDest), { recursive: true });
  fs.cpSync(prismaGeneratedSrc, prismaGeneratedDest, { recursive: true });
  console.log('✅ Prisma generated client copied');
}

console.log('✅ Post-build completed!');
