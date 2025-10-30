# Zivana Montessori School - Website Profile

Website profile perusahaan untuk Zivana Montessori School yang dibangun dengan Next.js, React, shadcn/ui, dan Bun.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS v4
- **Database:** SQLite dengan Prisma ORM
- **Runtime:** Bun
- **Form Validation:** React Hook Form + Zod
- **Icons:** Lucide React

## ✨ Fitur

### Frontend (Public Website)

- ✅ **Homepage** - Landing page dengan hero section dan keunggulan sekolah
- ✅ **Aktivitas Sekolah** - Informasi kurikulum, program pembelajaran, dan jadwal
- ✅ **Profil Sekolah** - Sejarah, visi misi, tim karyawan, dan penghargaan
- ✅ **Artikel & Berita** - Blog dengan artikel pendidikan dan berita sekolah
- ✅ **Pendaftaran** - Form pendaftaran dengan integrasi WhatsApp

### Backend (Dashboard Admin)

- ✅ **Dashboard** - Analytics dan overview pengunjung website
- ✅ **Manajemen Aktivitas** - CRUD program sekolah dan dokumentasi
- ✅ **Manajemen Artikel** - CRUD artikel dan berita
- ✅ **Manajemen Data** - CRUD karyawan, jadwal, penghargaan, dan social media

## 🛠️ Instalasi & Setup

1. Install dependencies:
```bash
bun install
```

2. Setup database:
```bash
bunx prisma generate
bunx prisma db push
```

3. Jalankan development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) untuk melihat website.

## 📁 Struktur Project

```
src/
├── app/                   # Next.js App Router
│   ├── aktivitas/         # Halaman Aktivitas
│   ├── artikel/           # Halaman Artikel
│   ├── dashboard/         # Dashboard Admin
│   ├── pendaftaran/       # Halaman Pendaftaran
│   ├── profil/            # Halaman Profil
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Header
│   └── Footer.tsx         # Footer
└── lib/                   # Utilities
    ├── prisma.ts          # Prisma client
    └── utils.ts           # Helper functions
```

## 🎨 Kustomisasi

### Nomor WhatsApp

Edit `src/app/pendaftaran/page.tsx`:
```typescript
const phoneNumber = '6281234567890' // Ganti dengan nomor sekolah
```

### Theme Colors

Edit `src/app/globals.css` untuk mengubah color scheme.

## 📋 Scripts

- `bun dev` - Jalankan development server
- `bun build` - Build untuk production
- `bun start` - Jalankan production server
- `bun lint` - Run ESLint

## 🚀 Deployment

### Deploy ke Netlify (Recommended)

**Catatan Penting**: Jangan drag & drop folder! Next.js perlu di-build terlebih dahulu.

#### Via Git (Recommended):

1. Push project ke GitHub/GitLab:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Login ke [Netlify](https://netlify.com)

3. Klik "Add new site" → "Import an existing project"

4. Connect repository dan set build settings:
   - **Build command**: `bun run build`
   - **Publish directory**: `.next`
   - **Node version**: 20

5. Add environment variables:
   ```
   DATABASE_URL=file:./dev.db
   ```

6. Deploy!

#### Via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Deploy ke Vercel (Alternative):

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy otomatis

### ⚠️ Database Production

SQLite file-based tidak cocok untuk production serverless. Untuk production, gunakan:
- **Vercel Postgres** (jika deploy di Vercel)
- **Supabase** (free tier available)
- **PlanetScale** 
- **Neon**

Update `DATABASE_URL` di environment variables sesuai provider.

## 🔐 Admin Login (Demo)

- Email: `admin@zivana.com`
- Password: `admin123`

## 📞 Support

Email: info@zivanamontessori.com  
Phone: (021) 1234-5678
