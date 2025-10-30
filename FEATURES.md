# Dokumentasi Fitur Website Zivana Montessori School

## 📱 Halaman Public (Frontend)

### 1. Homepage (/)
**Fitur:**
- Hero section dengan headline menarik
- Grid keunggulan sekolah (6 items)
- Section program unggulan
- CTA untuk pendaftaran
- Responsive mobile-first design

**Komponen:**
- Header dengan navigasi
- Footer dengan informasi kontak
- Cards untuk keunggulan
- Buttons untuk CTA

---

### 2. Halaman Aktivitas (/aktivitas)
**Fitur:**
- Penjelasan kurikulum Montessori
- Grid program pembelajaran (6 programs)
- Jadwal harian lengkap
- Badge untuk hari kegiatan
- Layout responsive

**Data Ditampilkan:**
- Nama program
- Deskripsi program
- Jadwal per program
- Rundown harian sekolah

---

### 3. Halaman Profil (/profil)
**Fitur:**
- Sejarah singkat sekolah
- Visi & Misi (card layout)
- Tim karyawan dengan level:
  - Pimpinan Sekolah
  - Tenaga Pendidik
  - Tenaga Kependidikan
  - Tenaga Operasional
- Carousel penghargaan
- Grid layout responsive

**Data Ditampilkan:**
- Informasi sekolah
- Data karyawan
- Penghargaan yang diraih

---

### 4. Halaman Artikel (/artikel)
**Fitur:**
- Grid artikel dengan pagination
- Filter by category (badge)
- Meta info: author, date
- Excerpt artikel
- Link ke detail artikel

**Halaman Detail (/artikel/[id]):**
- Full content artikel
- Breadcrumb navigation
- Share buttons (FB, Twitter, WA)
- Related articles
- Author info

---

### 5. Halaman Pendaftaran (/pendaftaran)
**Fitur:**
- Form validasi dengan Zod
- React Hook Form
- Fields:
  - Nama Anak (required)
  - Nama Orang Tua (required)
  - Email (required, validation)
  - Phone/WhatsApp (required)
  - Alamat (optional)
  - Pesan (optional)
- Integrasi WhatsApp redirect
- Success message
- Banner instruksi pendaftaran
- Info syarat & biaya

**Flow:**
1. User isi form
2. Validasi client-side
3. Submit → generate WhatsApp message
4. Redirect ke WhatsApp
5. Show success message

---

## 🔐 Halaman Dashboard (Backoffice)

### 1. Dashboard Admin (/dashboard)
**Fitur:**
- Stats cards:
  - Total Pengunjung
  - Pendaftaran Baru
  - Artikel Published
  - Program Aktif
- Recent activity timeline
- Top pages chart
- Traffic overview
- Responsive layout

**Analytics:**
- Total views
- Unique visitors
- Click-through rate
- Device breakdown (coming soon)
- Location data (coming soon)

---

### 2. Manajemen Aktivitas (/dashboard/aktivitas)
**Fitur:**
- Table list program sekolah
- CRUD operations:
  - Create program baru
  - Edit program existing
  - Delete program
  - Manage dokumentasi foto
- Image count per program
- Quick stats cards
- Tips manajemen dokumentasi

**Data Fields:**
- Nama Program
- Deskripsi
- Images (multiple)
- Order/sorting

---

### 3. Manajemen Artikel (/dashboard/artikel)
**Fitur:**
- Table list artikel
- CRUD operations:
  - Create artikel baru
  - Edit artikel
  - Delete artikel
  - Publish/unpublish
- Status badge (Published/Draft)
- Filter & search (coming soon)
- Stats: total, published, draft

**Data Fields:**
- Title
- Content (rich text editor - coming soon)
- Author
- Image URL
- Published status
- Date

---

### 4. Manajemen (/dashboard/manajemen)
**Fitur dengan Tabs:**

**Tab 1: Karyawan**
- CRUD karyawan
- Level classification
- Data: nama, posisi, foto, level

**Tab 2: Jadwal Sekolah**
- CRUD jadwal harian
- Data: waktu, kegiatan, urutan

**Tab 3: Penghargaan**
- CRUD penghargaan
- Data: judul, tahun, gambar, urutan

**Tab 4: Social Media**
- CRUD social media accounts
- Data: platform, username, URL

---

## 🗄️ Database Schema (Prisma)

### Models:
1. **Program** - Program sekolah
2. **Image** - Dokumentasi foto (relasi ke Program)
3. **Article** - Artikel dan berita
4. **Employee** - Data karyawan
5. **Schedule** - Jadwal harian
6. **Award** - Penghargaan
7. **SocialMedia** - Akun sosmed
8. **Registration** - Data pendaftaran
9. **Analytics** - Tracking pengunjung

---

## 🎨 UI Components (shadcn/ui)

### Installed Components:
- Button
- Card
- Form
- Input
- Label
- Textarea
- Select
- Dialog
- Dropdown Menu
- Navigation Menu
- Separator
- Badge
- Carousel
- Table
- Tabs

---

## 🔄 Integration

### WhatsApp
- Form pendaftaran auto-generate message
- Redirect to WhatsApp Business
- Customizable phone number

### Analytics (Coming Soon)
- Google Analytics
- Custom tracking
- Device & location data

### Authentication (Coming Soon)
- NextAuth.js
- Admin login
- Protected routes

---

## 📱 Responsive Design

### Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-First Approach:
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Optimized images

---

## 🚀 Performance

### Optimization:
- Next.js Image optimization
- Font optimization (Inter)
- Code splitting
- Lazy loading components
- Static generation where possible

---

## 🔒 Security

### Current:
- Form validation (client & server)
- SQL injection prevention (Prisma)
- XSS protection

### Coming Soon:
- Rate limiting
- CSRF protection
- Admin authentication
- Role-based access control

---

## 📝 Content Management

### Managed via Dashboard:
✅ Programs & Documentation
✅ Articles & News
✅ Employee Data
✅ School Schedule
✅ Awards
✅ Social Media Links

### Static Content (requires code update):
- Homepage hero text
- About school (sejarah)
- Visi & Misi
- Footer info

---

## 🎯 Next Steps / Roadmap

### Phase 1 (Completed): ✅
- Basic website structure
- All public pages
- Dashboard layout
- Database schema
- WhatsApp integration

### Phase 2 (In Progress):
- [ ] Complete CRUD functionality
- [ ] Rich text editor for articles
- [ ] Image upload system
- [ ] Form submissions to database

### Phase 3 (Planned):
- [ ] Admin authentication
- [ ] Analytics implementation
- [ ] Email notifications
- [ ] Search functionality
- [ ] SEO optimization
- [ ] Performance monitoring

### Phase 4 (Future):
- [ ] Parent portal
- [ ] Online payment
- [ ] Student gallery
- [ ] Calendar system
- [ ] Newsletter system
