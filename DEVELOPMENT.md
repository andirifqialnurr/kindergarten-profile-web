# Panduan Development - Zivana Montessori School

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Setup database
bunx prisma generate
bunx prisma db push

# Run development server
bun dev

# Open browser
# http://localhost:3000
```

---

## 📁 Struktur Project

```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/
│   │   ├── aktivitas/           # Public: Aktivitas page
│   │   ├── artikel/             # Public: Artikel list & detail
│   │   ├── pendaftaran/         # Public: Registration form
│   │   └── profil/              # Public: School profile
│   ├── dashboard/               # Admin dashboard
│   │   ├── aktivitas/           # Admin: Program management
│   │   ├── artikel/             # Admin: Article management
│   │   ├── manajemen/           # Admin: General management
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   └── page.tsx             # Dashboard home
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles + Tailwind
│
├── components/
│   ├── ui/                      # shadcn/ui components (auto-generated)
│   ├── Header.tsx               # Main header/navbar
│   └── Footer.tsx               # Main footer
│
└── lib/
    ├── prisma.ts                # Prisma client singleton
    └── utils.ts                 # Helper functions (cn, etc)
```

---

## 🎨 Menambah Halaman Baru

### 1. Public Page

```bash
# Buat folder dan file
src/app/nama-halaman/page.tsx
```

```typescript
export default function NamaHalamanPage() {
  return (
    <div>
      {/* Content here */}
    </div>
  )
}
```

### 2. Dashboard Page

```bash
# Buat di dalam folder dashboard
src/app/dashboard/nama-halaman/page.tsx
```

```typescript
'use client'

export default function NamaHalamanDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Judul Halaman</h2>
        <p className="text-muted-foreground">Deskripsi</p>
      </div>
      {/* Content */}
    </div>
  )
}
```

Jangan lupa tambahkan ke sidebar di `src/app/dashboard/layout.tsx`.

---

## 🧩 Menambah Component

### shadcn/ui Component

```bash
bunx --bun shadcn@latest add [component-name]

# Contoh:
bunx --bun shadcn@latest add alert
bunx --bun shadcn@latest add avatar
bunx --bun shadcn@latest add sheet
```

### Custom Component

```bash
# Buat file baru
src/components/NamaComponent.tsx
```

```typescript
import { Button } from '@/components/ui/button'

interface NamaComponentProps {
  title: string
}

export default function NamaComponent({ title }: NamaComponentProps) {
  return (
    <div>
      <h3>{title}</h3>
      <Button>Click me</Button>
    </div>
  )
}
```

---

## 🗄️ Database Operations

### Membuat Model Baru

1. Edit `prisma/schema.prisma`:

```prisma
model NamaModel {
  id        String   @id @default(cuid())
  field1    String
  field2    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. Push ke database:

```bash
bunx prisma db push
bunx prisma generate
```

### Prisma Studio (GUI Database)

```bash
bunx prisma studio
# Buka http://localhost:5555
```

### Query Data

```typescript
import { prisma } from '@/lib/prisma'

// Get all
const items = await prisma.namaModel.findMany()

// Get by ID
const item = await prisma.namaModel.findUnique({
  where: { id: 'xxx' }
})

// Create
const newItem = await prisma.namaModel.create({
  data: {
    field1: 'value',
    field2: 123
  }
})

// Update
const updated = await prisma.namaModel.update({
  where: { id: 'xxx' },
  data: { field1: 'new value' }
})

// Delete
await prisma.namaModel.delete({
  where: { id: 'xxx' }
})
```

---

## 🛣️ API Routes

### Membuat API Endpoint

```bash
# Buat file
src/app/api/nama-endpoint/route.ts
```

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET
export async function GET(request: NextRequest) {
  try {
    const items = await prisma.namaModel.findMany()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = await prisma.namaModel.create({
      data: body
    })
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    )
  }
}
```

### Memanggil API dari Client

```typescript
'use client'

// GET
const response = await fetch('/api/nama-endpoint')
const data = await response.json()

// POST
const response = await fetch('/api/nama-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ field: 'value' })
})
```

---

## 📝 Form Handling

### Dengan React Hook Form + Zod

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

type FormValues = z.infer<typeof formSchema>

export default function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
    // Submit logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## 🎨 Styling

### Tailwind Classes

```typescript
// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Hover states
<button className="hover:bg-primary hover:text-white">

// Focus states
<input className="focus:ring-2 focus:ring-primary">
```

### Custom Styles dengan cn()

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)}>
```

---

## 🔍 Debugging

### Console Log

```typescript
console.log('Debug:', variable)
console.error('Error:', error)
console.table(arrayData)
```

### React DevTools
Install extension di browser untuk inspect components.

### Database
```bash
# Lihat data di Prisma Studio
bunx prisma studio
```

---

## 🧪 Testing (Coming Soon)

```bash
# Unit tests
bun test

# E2E tests
bun test:e2e
```

---

## 🚀 Build & Deploy

### Local Build

```bash
# Build production
bun run build

# Test production build
bun start
```

### Deploy ke Vercel

1. Push ke GitHub
2. Import di Vercel
3. Set environment variables
4. Deploy otomatis

---

## 📦 Package Management

### Add Package

```bash
bun add package-name
bun add -d package-name  # dev dependency
```

### Remove Package

```bash
bun remove package-name
```

### Update Packages

```bash
bun update
```

---

## 🎯 Best Practices

### 1. Naming Conventions
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### 2. Component Structure
```typescript
// 1. Imports
import { useState } from 'react'

// 2. Types/Interfaces
interface Props {
  title: string
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // 4. State & hooks
  const [state, setState] = useState()
  
  // 5. Functions
  const handleClick = () => {}
  
  // 6. Render
  return <div>{title}</div>
}
```

### 3. Error Handling
```typescript
try {
  // Code that might fail
} catch (error) {
  console.error('Error:', error)
  // Handle error gracefully
}
```

### 4. Loading States
```typescript
const [isLoading, setIsLoading] = useState(false)

if (isLoading) return <div>Loading...</div>
```

---

## 🐛 Common Issues

### Issue: Module not found
```bash
# Clear cache dan reinstall
rm -rf node_modules bun.lockb
bun install
```

### Issue: Database connection
```bash
# Reset database
bunx prisma db push --force-reset
```

### Issue: Port already in use
```bash
# Kill process di port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

## 💡 Tips

1. **Hot Reload**: Save file untuk auto-refresh browser
2. **TypeScript**: Hover untuk lihat type info
3. **Import Paths**: Gunakan `@/` untuk absolute imports
4. **Console**: Cek browser console untuk errors
5. **Git**: Commit sering dengan pesan yang jelas

---

## 🤝 Contributing

1. Buat branch baru untuk fitur
2. Commit dengan pesan yang jelas
3. Test sebelum push
4. Create pull request

---

Happy Coding! 🎉
