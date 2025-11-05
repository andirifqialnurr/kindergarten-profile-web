# 🚀 Panduan Deploy ke Shared Hosting

Panduan lengkap deploy project **Zivana Montessori School** ke shared hosting yang support Node.js.

---

## 📋 Requirements Hosting

Pastikan hosting Anda memiliki:

- ✅ **Node.js v18+** support
- ✅ **MySQL Database** (sudah tersedia)
- ✅ **SSH/Terminal** access (untuk setup awal)
- ✅ **cPanel** atau control panel sejenis
- ✅ **Minimal 512MB RAM**
- ✅ **~300MB disk space** (untuk node_modules + build files)

---

## 🏢 Hosting yang Cocok

Beberapa hosting Indonesia yang support Node.js:

1. **Niagahoster** - Node.js Hosting (~Rp 30.000/bulan)
2. **DomaiNesia** - Cloud Hosting (~Rp 50.000/bulan)
3. **Dewaweb** - Cloud VPS Lite (~Rp 80.000/bulan)
4. **IDCloudHost** - Node.js Hosting (~Rp 25.000/bulan)
5. **Hostinger** - VPS KVM (~Rp 60.000/bulan)

⚠️ **Pastikan hosting support Node.js 18+ dan MySQL!**

---

## 📦 Bagian 1: Persiapan di Lokal

### 1.1. Install Dependencies

```bash
# Gunakan npm (karena hosting biasanya tidak ada bun)
npm install
```

### 1.2. Update Database ke MySQL

Database sudah dikonfigurasi untuk MySQL. Kredensial:
- **Database**: `u189792424_zivana_dev`
- **Username**: `u189792424_zivana`
- **Password**: `Zivana04112025$`

### 1.3. Build Project

```bash
# Generate Prisma client & Build Next.js
npm run build
```

Setelah selesai, folder `.next/standalone/` akan berisi semua file yang siap di-upload.

---

## 🗄️ Bagian 2: Setup Database di Hosting

### 2.1. Pastikan Database Sudah Dibuat

Via **cPanel → MySQL Databases**, pastikan:
- ✅ Database: `u189792424_zivana_dev` sudah ada
- ✅ User: `u189792424_zivana` sudah ada
- ✅ User sudah memiliki ALL PRIVILEGES ke database

### 2.2. Catat Informasi Database

Anda akan butuh info ini:
```
Host: localhost (atau hostname MySQL dari hosting)
Port: 3306 (default MySQL)
Database: u189792424_zivana_dev
Username: u189792424_zivana
Password: Zivana04112025$
```

---

## 📤 Bagian 3: Upload Files ke Hosting

### Opsi A: Upload via FTP/SFTP (Mudah)

1. **Connect ke hosting** via FileZilla/WinSCP
2. **Navigate ke folder** `public_html/` (atau `~/` tergantung hosting)
3. **Upload seluruh folder** `.next/standalone/` ke hosting
4. **Rename folder** `standalone` menjadi nama project (opsional)

Struktur file di hosting:
```
public_html/
├── .next/
├── node_modules/
├── prisma/
├── public/
├── server.js
├── package.json
└── .env (buat manual, lihat step selanjutnya)
```

### Opsi B: Upload via Git (Recommended)

```bash
# 1. SSH ke hosting
ssh username@yourdomain.com

# 2. Navigate ke folder public_html
cd ~/public_html

# 3. Clone repository (atau upload manual)
git clone https://github.com/andirifqialnurr/kindergarten-profile-web.git .

# 4. Install dependencies
npm install

# 5. Build project
npm run build

# 6. Pindahkan file dari .next/standalone ke root
cp -r .next/standalone/* .
```

---

## ⚙️ Bagian 4: Konfigurasi Environment Variables

### 4.1. Buat File `.env` di Hosting

Via **SSH** atau **File Manager cPanel**, buat file `.env` di folder root project:

```bash
# .env (di hosting)
DATABASE_URL="mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
NODE_ENV="production"
PORT=3001
```

⚠️ **Ganti `yourdomain.com` dengan domain Anda!**

### 4.2. Test Database Connection

```bash
# SSH ke hosting
cd ~/public_html

# Test connection (harus berhasil)
npx prisma db push
```

Jika berhasil, Anda akan melihat: ✅ **"Your database is now in sync with your Prisma schema"**

---

## 🚀 Bagian 5: Setup Node.js Application

### 5.1. Via cPanel - Setup Node.js App

1. **Login ke cPanel**
2. **Find & Open**: "Setup Node.js App" atau "Node.js Selector"
3. **Create Application** dengan setting:

   ```
   Node.js Version: 18.x atau 20.x
   Application Mode: Production
   Application Root: /home/username/public_html
   Application URL: yourdomain.com
   Application Startup File: server.js
   ```

4. **Environment Variables** (tambahkan di cPanel):
   ```
   DATABASE_URL = mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev
   NODE_ENV = production
   PORT = 3001
   ```

5. **Klik "Create"**

### 5.2. Install Dependencies via cPanel

Di halaman Node.js App, klik **"Run NPM Install"** atau jalankan via SSH:

```bash
cd ~/public_html
npm install --production
```

### 5.3. Generate Prisma Client

```bash
cd ~/public_html
npx prisma generate
```

### 5.4. Sync Database Schema

```bash
cd ~/public_html
npx prisma db push
```

Ini akan membuat semua tabel di database MySQL Anda.

---

## 🔧 Bagian 6: Setup Reverse Proxy (jika perlu)

Jika Node.js app berjalan di port 3001, Anda perlu proxy dari port 80/443.

### 6.1. Buat `.htaccess` di `public_html/`

```apache
# .htaccess
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP:Upgrade} !=websocket
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
```

### 6.2. Atau Setup di cPanel

Beberapa hosting otomatis handle ini via **"Application URL"** setting di Node.js App Manager.

---

## ▶️ Bagian 7: Start Application

### 7.1. Via cPanel

Di **Node.js App Manager**, klik tombol **"Start"** atau **"Restart"**.

### 7.2. Via SSH (Manual)

```bash
cd ~/public_html
node server.js
```

### 7.3. Via PM2 (Recommended untuk Auto-Restart)

```bash
# Install PM2
npm install -g pm2

# Start app dengan PM2
pm2 start server.js --name "zivana-web"

# Save PM2 process list
pm2 save

# Setup PM2 auto-start on reboot
pm2 startup
```

---

## ✅ Bagian 8: Verify Deployment

### 8.1. Test Public Pages

Buka di browser:
- ✅ Homepage: `https://yourdomain.com/`
- ✅ Aktivitas: `https://yourdomain.com/aktivitas`
- ✅ Artikel: `https://yourdomain.com/artikel`
- ✅ Profil: `https://yourdomain.com/profil`
- ✅ Pendaftaran: `https://yourdomain.com/pendaftaran`

### 8.2. Test Admin Login

1. Buka: `https://yourdomain.com/login`
2. Login dengan:
   - **Email**: `admin@zivana.com`
   - **Password**: `admin123`
3. Pastikan redirect ke dashboard

### 8.3. Test CRUD Operations

Di dashboard, test:
- ✅ Tambah Program Aktivitas
- ✅ Publish Artikel
- ✅ Edit Pengaturan WhatsApp
- ✅ Customize Form Pendaftaran

---

## 📊 Bagian 9: Populate Data Awal

### 9.1. Via Dashboard Admin

Login ke `/login` dan tambahkan data manual:

1. **Aktivitas** → Tambah program sekolah
2. **Artikel** → Buat & publish artikel
3. **Manajemen** → Tambah karyawan, jadwal, penghargaan
4. **Pengaturan** → Setup WhatsApp number & template

### 9.2. Via Prisma Studio (Opsional)

```bash
# SSH ke hosting
cd ~/public_html
npx prisma studio
```

Buka: `http://yourdomain.com:5555` (port default Prisma Studio)

---

## 🔄 Bagian 10: Update/Redeploy

Untuk update setelah ada perubahan code:

### Via Git (Recommended)

```bash
# SSH ke hosting
cd ~/public_html

# Pull latest changes
git pull origin main

# Install dependencies (jika ada perubahan)
npm install

# Rebuild
npm run build

# Copy files
cp -r .next/standalone/* .

# Restart app
pm2 restart zivana-web
# atau via cPanel: Restart Node.js App
```

### Via FTP

1. Build di lokal: `npm run build`
2. Upload folder `.next/standalone/` ke hosting (overwrite)
3. Restart app di cPanel atau via PM2

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot find module"

```bash
cd ~/public_html
npm install --production
```

### ❌ Error: "Prisma Client not found"

```bash
npx prisma generate
```

### ❌ Error: "Database connection failed"

Check file `.env`:
```bash
# Pastikan format benar (no spaces, correct password)
DATABASE_URL="mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev"
```

Test connection:
```bash
npx prisma db push
```

### ❌ Error: 502 Bad Gateway

Node.js app tidak berjalan. Check status:

```bash
# Via PM2
pm2 status
pm2 logs zivana-web

# Via cPanel
# Node.js App Manager → Check status & logs
```

Restart:
```bash
pm2 restart zivana-web
# atau
node server.js
```

### ❌ Error: Port already in use

Ganti port di `.env`:
```bash
PORT=3002
```

Restart app.

### ❌ Error: Permission denied

Fix permissions:
```bash
chmod -R 755 ~/public_html
```

---

## 📱 Monitoring Production

### Via PM2

```bash
# Check status
pm2 status

# View logs
pm2 logs zivana-web

# Monitor real-time
pm2 monit

# Restart
pm2 restart zivana-web

# Stop
pm2 stop zivana-web
```

### Via cPanel

**Node.js App Manager** → **View Logs** → Check error logs

---

## 🔒 Security Checklist

Sebelum launch ke public:

- ✅ **Ganti password admin** default di database
- ✅ **Enable HTTPS** (Let's Encrypt via cPanel)
- ✅ **Setup backup** database otomatis
- ✅ **Update** `NEXTAUTH_SECRET` dengan random string panjang
- ✅ **Hide** error stack traces di production
- ✅ **Rate limit** untuk API endpoints (opsional)

### Ganti Admin Password

```sql
-- Via phpMyAdmin atau MySQL command line
UPDATE Employee SET password = 'NEW_HASHED_PASSWORD' WHERE email = 'admin@zivana.com';
```

---

## 💾 Backup Database

### Manual Backup

```bash
# Via SSH
mysqldump -u u189792424_zivana -p u189792424_zivana_dev > backup-$(date +%Y%m%d).sql
```

### Via cPanel

**cPanel → phpMyAdmin** → Select database → **Export** → Download

### Automated Backup (Cron Job)

Setup di **cPanel → Cron Jobs**:

```bash
# Daily backup at 2 AM
0 2 * * * mysqldump -u u189792424_zivana -p'Zivana04112025$' u189792424_zivana_dev > ~/backups/backup-$(date +\%Y\%m\%d).sql
```

---

## 📈 Performance Tips

1. **Enable caching** di `.htaccess`:
   ```apache
   # Browser caching
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access 1 year"
     ExpiresByType image/jpeg "access 1 year"
     ExpiresByType image/png "access 1 year"
     ExpiresByType text/css "access 1 month"
     ExpiresByType text/javascript "access 1 month"
   </IfModule>
   ```

2. **Compress images** sebelum upload via dashboard

3. **Monitor disk usage** (database akan bertambah seiring waktu)

4. **Setup log rotation** untuk PM2 logs:
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 7
   ```

---

## 🎉 Deployment Selesai!

Website Anda sekarang **LIVE** di hosting! 🚀

**Next Steps:**
1. ✅ Ganti admin credentials
2. ✅ Populate data via dashboard
3. ✅ Setup WhatsApp integration
4. ✅ Test registration form
5. ✅ Share website URL!

---

## 📞 Butuh Bantuan?

Jika ada error atau pertanyaan:

1. **Check logs**:
   - PM2: `pm2 logs zivana-web`
   - cPanel: Node.js App → Logs
   
2. **Check database connection**:
   - `npx prisma db push`
   
3. **Restart app**:
   - `pm2 restart zivana-web`

4. **Contact hosting support** untuk isu server

---

✅ **Selamat! Website Zivana Montessori School sudah live!** 🎊
