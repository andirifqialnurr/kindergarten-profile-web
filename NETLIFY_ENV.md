# Environment Variables untuk Netlify
# Set di: Site Settings → Environment Variables

## ⚠️ PENTING: Jangan commit file ini ke Git!

---

## Untuk Demo/Testing (Data akan reset setiap deploy):

```
DATABASE_URL=file:./dev.db
```

---

## Untuk Production (RECOMMENDED):

### Setup Supabase (Free):

1. Buat project di https://supabase.com
2. Masuk ke Settings → Database
3. Copy connection string (mode: Session)
4. Set di Netlify:

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Setup Neon (Free):

1. Buat project di https://neon.tech
2. Copy connection string
3. Set di Netlify:

```
DATABASE_URL=postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
```

---

## Optional (jika ada):

```
# App URL (auto-detect dari Netlify)
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app

# WhatsApp untuk form pendaftaran
WHATSAPP_NUMBER=6281234567890

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Cara Set Environment Variables di Netlify:

1. Login ke Netlify Dashboard
2. Pilih site Anda
3. **Site settings** → **Environment variables**
4. Klik **"Add a variable"**
5. Masukkan Key & Value
6. Save
7. **Trigger deploy** (Settings → Build & deploy → Trigger deploy)

---

## Verifikasi:

Setelah deploy, cek di build logs apakah environment variables terbaca:

```
✓ DATABASE_URL is set
✓ NEXT_PUBLIC_APP_URL is set
```

---

## Troubleshooting:

### Error: "Prisma Client not initialized"
**Solusi**: Pastikan `postinstall` script jalan saat build:
```json
"postinstall": "prisma generate"
```

### Error: "Database connection failed"
**Solusi**: 
1. Cek format connection string
2. Cek firewall database (whitelist 0.0.0.0/0)
3. Cek credentials (username/password)

### Data hilang setelah redeploy
**Penyebab**: Pakai SQLite file-based di serverless
**Solusi**: Migrasi ke database cloud (Supabase/Neon)
