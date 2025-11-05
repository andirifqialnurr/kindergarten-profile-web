# ✅ Checklist Deploy ke Hosting

## 📋 Persiapan Sebelum Deploy

### 1. File yang Sudah Disiapkan

- ✅ **next.config.ts** - Standalone mode enabled
- ✅ **package.json** - Build scripts updated
- ✅ **prisma/schema.prisma** - MySQL configured
- ✅ **scripts/post-build.js** - Auto-copy files after build
- ✅ **.env** - Development environment (SQLite)
- ✅ **.env.production** - Production environment (MySQL dengan kredensial Anda)
- ✅ **.env.example** - Template untuk reference
- ✅ **server.js** - Production startup file
- ✅ **HOSTING_DEPLOY.md** - Panduan lengkap deployment
- ✅ **README.md** - Dokumentasi project

### 2. Database MySQL Anda

- ✅ **Database Name**: `u189792424_zivana_dev`
- ✅ **Username**: `u189792424_zivana`
- ✅ **Password**: `Zivana04112025$`
- ✅ **Host**: `localhost`
- ✅ **Port**: `3306`

---

## 🚀 Langkah Deploy (Quick Version)

### Step 1: Build Project di Lokal

```bash
# Install dependencies (gunakan npm untuk production)
npm install

# Build project (ini akan generate folder .next/standalone/)
npm run build
```

✅ **Output**: Folder `.next/standalone/` berisi semua file siap deploy

---

### Step 2: Upload ke Hosting

**Opsi A: Via FTP/FileZilla**
1. Connect ke hosting Anda
2. Navigate ke folder `public_html/`
3. Upload **seluruh isi** folder `.next/standalone/`
4. Buat file `.env` manual (copy dari `.env.production`)

**Opsi B: Via Git + SSH (Recommended)**
```bash
# 1. SSH ke hosting
ssh username@yourdomain.com

# 2. Clone repo
cd ~/public_html
git clone https://github.com/andirifqialnurr/kindergarten-profile-web.git .

# 3. Install & build
npm install
npm run build

# 4. Copy built files
cp -r .next/standalone/* .

# 5. Create .env file
nano .env
# Paste content dari .env.production, save (Ctrl+O, Ctrl+X)
```

---

### Step 3: Setup Database di Hosting

```bash
# SSH ke hosting
cd ~/public_html

# Generate Prisma Client
npx prisma generate

# Push schema ke MySQL (ini akan create tables)
npx prisma db push
```

✅ **Expected**: Melihat pesan "Your database is now in sync with your Prisma schema"

---

### Step 4: Setup Node.js App di cPanel

1. **Login cPanel** → Find "Setup Node.js App"
2. **Create Application**:
   - **Node Version**: 18.x atau 20.x
   - **App Root**: `/home/username/public_html`
   - **App URL**: `yourdomain.com`
   - **Startup File**: `server.js`
3. **Add Environment Variables**:
   ```
   DATABASE_URL = mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev
   NODE_ENV = production
   PORT = 3001
   ```
4. **Click "Create"**
5. **Click "Run NPM Install"** (jika ada)
6. **Click "Start"**

---

### Step 5: Setup .htaccess (jika perlu)

Jika app tidak otomatis accessible, buat file `.htaccess`:

```apache
# public_html/.htaccess
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP:Upgrade} !=websocket
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
```

---

### Step 6: Verify Deployment

Buka browser dan test:

- ✅ `https://yourdomain.com/` - Homepage
- ✅ `https://yourdomain.com/aktivitas` - Aktivitas
- ✅ `https://yourdomain.com/artikel` - Artikel
- ✅ `https://yourdomain.com/login` - Login admin

**Login Credentials**:
- Email: `admin@zivana.com`
- Password: `admin123`

---

### Step 7: Populate Data

1. Login ke dashboard: `https://yourdomain.com/login`
2. Tambah data di setiap menu:
   - **Aktivitas** → Add programs
   - **Artikel** → Publish articles
   - **Manajemen** → Add employees, schedules, awards
   - **Pengaturan** → Setup WhatsApp number & template

---

## 🔧 Post-Deploy Tasks

### Ganti Admin Password

**PENTING**: Ganti password default untuk security!

Sementara ini masih hardcoded di file `src/app/login/page.tsx`. 

TODO: Implement proper authentication dengan database.

### Enable HTTPS

Di cPanel → SSL/TLS → Let's Encrypt → Install

### Setup Backup

Di cPanel → Backup → Setup automated backup

---

## 🐛 Troubleshooting Common Issues

### ❌ 502 Bad Gateway
**Cause**: Node.js app not running  
**Fix**: Check cPanel Node.js App status, restart app

### ❌ Cannot find module
**Cause**: Missing dependencies  
**Fix**: 
```bash
cd ~/public_html
npm install --production
```

### ❌ Prisma Client not found
**Cause**: Prisma client not generated  
**Fix**:
```bash
npx prisma generate
```

### ❌ Database connection failed
**Cause**: Wrong DATABASE_URL in .env  
**Fix**: Check credentials in `.env` file, ensure MySQL running

### ❌ EADDRINUSE: Port already in use
**Cause**: Port 3001 already taken  
**Fix**: Change PORT in `.env` to 3002 or 3003

---

## 📝 File Locations Checklist

Pastikan file-file ini ada di hosting:

```
public_html/
├── .next/                    # Next.js build output
├── node_modules/             # Dependencies
├── prisma/                   # Prisma schema & migrations
│   └── schema.prisma
├── public/                   # Static files
├── .env                      # ⚠️ MANUAL CREATE - Database credentials
├── server.js                 # Startup file
├── package.json              # Dependencies list
└── .htaccess (optional)      # Reverse proxy
```

---

## 🔄 Update Workflow (Setelah Deploy)

Ketika ada perubahan code:

```bash
# Di lokal
git add .
git commit -m "Update: ..."
git push origin main

# Di hosting (via SSH)
cd ~/public_html
git pull origin main
npm install
npm run build
cp -r .next/standalone/* .
pm2 restart zivana-web
# atau restart via cPanel
```

---

## 📞 Need Help?

Jika stuck di langkah manapun:

1. **Check logs**:
   - cPanel: Node.js App → View Logs
   - SSH: `pm2 logs zivana-web`

2. **Check database**:
   - cPanel: phpMyAdmin → Check if tables exist
   - SSH: `npx prisma db push`

3. **Restart app**:
   - cPanel: Node.js App → Restart
   - SSH: `pm2 restart zivana-web`

4. **Check file permissions**:
   ```bash
   chmod -R 755 ~/public_html
   ```

---

## ✅ Deployment Complete!

Setelah semua langkah selesai, website Anda akan:

- ✅ Live di domain Anda
- ✅ Connected ke MySQL database
- ✅ Admin dashboard functional
- ✅ Registration form works
- ✅ WhatsApp integration active

**Next**: Populate content via dashboard & promote website! 🎉

---

## 📚 Additional Resources

- **Full Guide**: [HOSTING_DEPLOY.md](HOSTING_DEPLOY.md)
- **Project Info**: [README.md](README.md)
- **Database Schema**: `prisma/schema.prisma`
- **Environment Vars**: `.env.production`

---

**Good luck with your deployment!** 🚀
