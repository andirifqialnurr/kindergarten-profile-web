# Panduan Deploy ke Netlify

## ⚠️ Penting

**JANGAN DRAG & DROP FOLDER!** Next.js perlu di-build dulu, bukan cuma upload files.

## Metode 1: Via Git (RECOMMENDED) ✅

### Step 1: Push ke GitHub

```bash
# Inisialisasi git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit"

# Create repo baru di GitHub, lalu:
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Connect ke Netlify

1. Login ke https://app.netlify.com
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Pilih repository project ini
5. Set build settings:
   ```
   Build command: bun run build
   Publish directory: .next
   ```
6. Klik **"Show advanced"** → **"New variable"**:
   ```
   Key: DATABASE_URL
   Value: file:./dev.db
   ```
7. Klik **"Deploy site"**

### Step 3: Tunggu Build

Build akan jalan otomatis. Tunggu 2-5 menit.

---

## Metode 2: Via Netlify CLI

### Step 1: Install CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

Browser akan terbuka, login dengan akun Netlify.

### Step 3: Init & Deploy

```bash
# Link ke Netlify
netlify init

# Build project
bun run build

# Deploy ke production
netlify deploy --prod
```

---

## Troubleshooting

### Error: "Page not found (404)"

**Penyebab**: Netlify tidak tahu cara handle Next.js App Router.

**Solusi**: Pastikan file `netlify.toml` ada di root project dengan isi:
```toml
[build]
  command = "bun run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Error: "Module not found: prisma"

**Penyebab**: Prisma client belum di-generate saat build.

**Solusi**: Sudah ditambahkan `postinstall` script di package.json:
```json
"postinstall": "prisma generate"
```

### Database Issues di Production

**Masalah**: SQLite file-based tidak reliable di serverless environment.

**Solusi**: Gunakan database cloud untuk production:

1. **Supabase** (Free tier):
   ```bash
   # Install
   npm install @supabase/supabase-js
   
   # Update DATABASE_URL di Netlify
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   ```

2. **Vercel Postgres** (jika migrasi ke Vercel)

3. **PlanetScale** (MySQL)

4. **Neon** (PostgreSQL)

---

## Mengubah Environment Variables

1. Buka Netlify Dashboard
2. Pilih site Anda
3. **Site settings** → **Environment variables**
4. Edit atau tambah variable baru
5. Redeploy site

---

## Custom Domain

1. Buka Netlify Dashboard
2. **Domain settings** → **Add custom domain**
3. Masukkan domain (contoh: `zivanamontessori.com`)
4. Update DNS records sesuai instruksi Netlify

---

## Auto Deploy on Git Push

Setelah connect via Git, setiap `git push` ke branch `main` akan trigger auto deploy!

```bash
# Edit code
git add .
git commit -m "Update content"
git push

# Netlify auto-deploy! 🚀
```

---

## Verifikasi Deployment Sukses

Cek:
- ✅ Homepage loading
- ✅ Navigasi berfungsi
- ✅ Halaman Aktivitas tampil
- ✅ Halaman Artikel tampil
- ✅ Halaman Profil tampil
- ✅ Login admin berfungsi
- ✅ Dashboard bisa diakses

---

## Support

Jika masih ada masalah, hubungi:
- Netlify Docs: https://docs.netlify.com
- Next.js Docs: https://nextjs.org/docs
