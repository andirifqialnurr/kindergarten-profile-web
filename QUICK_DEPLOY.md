# 🚀 Quick Deploy Commands

Copy-paste commands ini untuk deploy cepat!

---

## 📦 1. Build Project (Di Lokal)

```bash
# Install dependencies
npm install

# Build untuk production
npm run build
```

**Output**: Folder `.next/standalone/` siap di-upload!

---

## 📤 2. Upload ke Hosting

### Via FTP/FileZilla:
1. Connect ke hosting
2. Upload **semua isi** `.next/standalone/` ke `public_html/`

### Via Git + SSH:
```bash
# SSH ke hosting
ssh username@yourdomain.com

# Clone & build
cd ~/public_html
git clone https://github.com/andirifqialnurr/kindergarten-profile-web.git .
npm install
npm run build
cp -r .next/standalone/* .
```

---

## 🗄️ 3. Setup Database

```bash
# SSH ke hosting
cd ~/public_html

# Create .env file
cat > .env << 'EOF'
DATABASE_URL="mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
NODE_ENV="production"
PORT=3001
EOF

# Generate Prisma & Push schema
npx prisma generate
npx prisma db push
```

---

## ⚙️ 4. Setup Node.js (cPanel)

**cPanel → Setup Node.js App:**

```
Node Version: 18.x
App Root: /home/username/public_html
App URL: yourdomain.com
Startup File: server.js
```

**Environment Variables:**
```
DATABASE_URL = mysql://u189792424_zivana:Zivana04112025$@localhost:3306/u189792424_zivana_dev
NODE_ENV = production
PORT = 3001
```

**Click**: "Create" → "Run NPM Install" → "Start"

---

## 🔧 5. Setup .htaccess (jika perlu)

```bash
cat > .htaccess << 'EOF'
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP:Upgrade} !=websocket
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
EOF
```

---

## ✅ 6. Verify

Test di browser:
- Homepage: `https://yourdomain.com/`
- Login: `https://yourdomain.com/login` (admin@zivana.com / admin123)

---

## 🔄 Update/Redeploy

```bash
# SSH ke hosting
cd ~/public_html
git pull origin main
npm install
npm run build
cp -r .next/standalone/* .
pm2 restart zivana-web  # atau restart di cPanel
```

---

## 🐛 Troubleshoot

```bash
# Check logs
pm2 logs zivana-web

# Restart app
pm2 restart zivana-web

# Check database
npx prisma db push

# Reinstall dependencies
npm install --production

# Regenerate Prisma
npx prisma generate
```

---

## 📊 Database Credentials

```
Database: u189792424_zivana_dev
Username: u189792424_zivana
Password: Zivana04112025$
Host: localhost
Port: 3306
```

---

**Done!** 🎉 Website live di: `https://yourdomain.com`
