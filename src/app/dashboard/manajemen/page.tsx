'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash, Loader2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

type Employee = {
  id: string
  name: string
  position: string
  imageUrl: string | null
  level: string
  order: number
}

type Schedule = {
  id: string
  time: string
  activity: string
  order: number
}

type Award = {
  id: string
  title: string
  imageUrl: string
  year: number | null
  order: number
  createdAt: string
}

type SocialMedia = {
  id: string
  platform: string
  username: string
  url: string
}

const EMPLOYEE_LEVELS = [
  { value: 'PIMPINAN', label: 'Pimpinan' },
  { value: 'TENAGA_PENDIDIK', label: 'Tenaga Pendidik' },
  { value: 'TENAGA_KEPENDIDIKAN', label: 'Tenaga Kependidikan' },
  { value: 'TENAGA_OPERASIONAL', label: 'Tenaga Operasional' },
]

export default function ManajemenPage() {
  // State untuk data
  const [employees, setEmployees] = useState<Employee[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([])
  
  // State untuk loading
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadingSchedules, setLoadingSchedules] = useState(true)
  const [loadingAwards, setLoadingAwards] = useState(true)
  const [loadingSocial, setLoadingSocial] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // State untuk modals - Employee
  const [employeeAddModal, setEmployeeAddModal] = useState(false)
  const [employeeEditModal, setEmployeeEditModal] = useState(false)
  const [employeeDeleteDialog, setEmployeeDeleteDialog] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    position: '',
    imageUrl: '',
    level: '',
    order: 0,
  })

  // State untuk modals - Schedule
  const [scheduleAddModal, setScheduleAddModal] = useState(false)
  const [scheduleEditModal, setScheduleEditModal] = useState(false)
  const [scheduleDeleteDialog, setScheduleDeleteDialog] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [scheduleForm, setScheduleForm] = useState({
    time: '',
    activity: '',
    order: 0,
  })

  // State untuk modals - Award
  const [awardAddModal, setAwardAddModal] = useState(false)
  const [awardEditModal, setAwardEditModal] = useState(false)
  const [awardDeleteDialog, setAwardDeleteDialog] = useState(false)
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)
  const [awardForm, setAwardForm] = useState({
    title: '',
    imageUrl: '',
    year: new Date().getFullYear(),
    order: 0,
  })

  // State untuk modals - Social Media
  const [socialAddModal, setSocialAddModal] = useState(false)
  const [socialEditModal, setSocialEditModal] = useState(false)
  const [socialDeleteDialog, setSocialDeleteDialog] = useState(false)
  const [selectedSocial, setSelectedSocial] = useState<SocialMedia | null>(null)
  const [socialForm, setSocialForm] = useState({
    platform: '',
    username: '',
    url: '',
  })

  // Fetch functions
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true)
      const res = await fetch('/api/employees')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      toast.error('Gagal memuat data karyawan')
    } finally {
      setLoadingEmployees(false)
    }
  }

  const fetchSchedules = async () => {
    try {
      setLoadingSchedules(true)
      const res = await fetch('/api/schedules')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setSchedules(data)
    } catch (error) {
      toast.error('Gagal memuat data jadwal')
    } finally {
      setLoadingSchedules(false)
    }
  }

  const fetchAwards = async () => {
    try {
      setLoadingAwards(true)
      const res = await fetch('/api/awards')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setAwards(data)
    } catch (error) {
      toast.error('Gagal memuat data penghargaan')
    } finally {
      setLoadingAwards(false)
    }
  }

  const fetchSocialMedia = async () => {
    try {
      setLoadingSocial(true)
      const res = await fetch('/api/social-media')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setSocialMedia(data)
    } catch (error) {
      toast.error('Gagal memuat data social media')
    } finally {
      setLoadingSocial(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
    fetchSchedules()
    fetchAwards()
    fetchSocialMedia()
  }, [])

  // Employee CRUD handlers
  const handleAddEmployee = async () => {
    if (!employeeForm.name || !employeeForm.position || !employeeForm.level) {
      toast.error('Nama, posisi, dan level harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeForm),
      })
      if (!res.ok) throw new Error('Failed to create')
      
      toast.success('Karyawan berhasil ditambahkan')
      setEmployeeAddModal(false)
      setEmployeeForm({ name: '', position: '', imageUrl: '', level: '', order: 0 })
      fetchEmployees()
    } catch (error) {
      toast.error('Gagal menambahkan karyawan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditEmployee = async () => {
    if (!selectedEmployee || !employeeForm.name || !employeeForm.position || !employeeForm.level) {
      toast.error('Nama, posisi, dan level harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success('Karyawan berhasil diupdate')
      setEmployeeEditModal(false)
      setSelectedEmployee(null)
      setEmployeeForm({ name: '', position: '', imageUrl: '', level: '', order: 0 })
      fetchEmployees()
    } catch (error) {
      toast.error('Gagal mengupdate karyawan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return

    try {
      setSubmitting(true)
      const res = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success('Karyawan berhasil dihapus')
      setEmployeeDeleteDialog(false)
      setSelectedEmployee(null)
      fetchEmployees()
    } catch (error) {
      toast.error('Gagal menghapus karyawan')
    } finally {
      setSubmitting(false)
    }
  }

  // Schedule CRUD handlers
  const handleAddSchedule = async () => {
    if (!scheduleForm.time || !scheduleForm.activity) {
      toast.error('Waktu dan kegiatan harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleForm),
      })
      if (!res.ok) throw new Error('Failed to create')
      
      toast.success('Jadwal berhasil ditambahkan')
      setScheduleAddModal(false)
      setScheduleForm({ time: '', activity: '', order: 0 })
      fetchSchedules()
    } catch (error) {
      toast.error('Gagal menambahkan jadwal')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSchedule = async () => {
    if (!selectedSchedule || !scheduleForm.time || !scheduleForm.activity) {
      toast.error('Waktu dan kegiatan harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(`/api/schedules/${selectedSchedule.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success('Jadwal berhasil diupdate')
      setScheduleEditModal(false)
      setSelectedSchedule(null)
      setScheduleForm({ time: '', activity: '', order: 0 })
      fetchSchedules()
    } catch (error) {
      toast.error('Gagal mengupdate jadwal')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) return

    try {
      setSubmitting(true)
      const res = await fetch(`/api/schedules/${selectedSchedule.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success('Jadwal berhasil dihapus')
      setScheduleDeleteDialog(false)
      setSelectedSchedule(null)
      fetchSchedules()
    } catch (error) {
      toast.error('Gagal menghapus jadwal')
    } finally {
      setSubmitting(false)
    }
  }

  // Award CRUD handlers
  const handleAddAward = async () => {
    if (!awardForm.title || !awardForm.imageUrl) {
      toast.error('Judul dan URL gambar harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/awards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(awardForm),
      })
      if (!res.ok) throw new Error('Failed to create')
      
      toast.success('Penghargaan berhasil ditambahkan')
      setAwardAddModal(false)
      setAwardForm({ title: '', imageUrl: '', year: new Date().getFullYear(), order: 0 })
      fetchAwards()
    } catch (error) {
      toast.error('Gagal menambahkan penghargaan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditAward = async () => {
    if (!selectedAward || !awardForm.title || !awardForm.imageUrl) {
      toast.error('Judul dan URL gambar harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(`/api/awards/${selectedAward.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(awardForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success('Penghargaan berhasil diupdate')
      setAwardEditModal(false)
      setSelectedAward(null)
      setAwardForm({ title: '', imageUrl: '', year: new Date().getFullYear(), order: 0 })
      fetchAwards()
    } catch (error) {
      toast.error('Gagal mengupdate penghargaan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAward = async () => {
    if (!selectedAward) return

    try {
      setSubmitting(true)
      const res = await fetch(`/api/awards/${selectedAward.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success('Penghargaan berhasil dihapus')
      setAwardDeleteDialog(false)
      setSelectedAward(null)
      fetchAwards()
    } catch (error) {
      toast.error('Gagal menghapus penghargaan')
    } finally {
      setSubmitting(false)
    }
  }

  // Social Media CRUD handlers
  const handleAddSocial = async () => {
    if (!socialForm.platform || !socialForm.username || !socialForm.url) {
      toast.error('Semua field harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/social-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialForm),
      })
      if (!res.ok) throw new Error('Failed to create')
      
      toast.success('Social media berhasil ditambahkan')
      setSocialAddModal(false)
      setSocialForm({ platform: '', username: '', url: '' })
      fetchSocialMedia()
    } catch (error) {
      toast.error('Gagal menambahkan social media')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSocial = async () => {
    if (!selectedSocial || !socialForm.platform || !socialForm.username || !socialForm.url) {
      toast.error('Semua field harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(`/api/social-media/${selectedSocial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success('Social media berhasil diupdate')
      setSocialEditModal(false)
      setSelectedSocial(null)
      setSocialForm({ platform: '', username: '', url: '' })
      fetchSocialMedia()
    } catch (error) {
      toast.error('Gagal mengupdate social media')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteSocial = async () => {
    if (!selectedSocial) return

    try {
      setSubmitting(true)
      const res = await fetch(`/api/social-media/${selectedSocial.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success('Social media berhasil dihapus')
      setSocialDeleteDialog(false)
      setSelectedSocial(null)
      fetchSocialMedia()
    } catch (error) {
      toast.error('Gagal menghapus social media')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manajemen</h2>
        <p className="text-muted-foreground">
          Kelola data karyawan, jadwal, penghargaan, dan social media
        </p>
      </div>

      <Tabs defaultValue="karyawan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="karyawan">Karyawan</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal Sekolah</TabsTrigger>
          <TabsTrigger value="penghargaan">Penghargaan</TabsTrigger>
          <TabsTrigger value="sosial">Social Media</TabsTrigger>
        </TabsList>

        {/* Tab Karyawan */}
        <TabsContent value="karyawan">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Karyawan</CardTitle>
                  <CardDescription>
                    Kelola data karyawan sekolah
                  </CardDescription>
                </div>
                <Button onClick={() => setEmployeeAddModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Karyawan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingEmployees ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : employees.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada karyawan
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Posisi</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {EMPLOYEE_LEVELS.find(l => l.value === employee.level)?.label || employee.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setEmployeeForm({
                                name: employee.name,
                                position: employee.position,
                                imageUrl: employee.imageUrl || '',
                                level: employee.level,
                                order: employee.order,
                              })
                              setEmployeeEditModal(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setEmployeeDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Jadwal */}
        <TabsContent value="jadwal">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Jadwal Sekolah</CardTitle>
                  <CardDescription>
                    Kelola jadwal kegiatan harian sekolah
                  </CardDescription>
                </div>
                <Button onClick={() => setScheduleAddModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Jadwal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingSchedules ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : schedules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada jadwal
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Waktu</TableHead>
                      <TableHead>Kegiatan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.time}</TableCell>
                        <TableCell>{schedule.activity}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedSchedule(schedule)
                              setScheduleForm({
                                time: schedule.time,
                                activity: schedule.activity,
                                order: schedule.order,
                              })
                              setScheduleEditModal(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedSchedule(schedule)
                              setScheduleDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Penghargaan */}
        <TabsContent value="penghargaan">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Penghargaan Sekolah</CardTitle>
                  <CardDescription>
                    Kelola data penghargaan yang diraih sekolah
                  </CardDescription>
                </div>
                <Button onClick={() => setAwardAddModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Penghargaan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingAwards ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : awards.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada penghargaan
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul Penghargaan</TableHead>
                      <TableHead>Tahun</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {awards.map((award) => (
                      <TableRow key={award.id}>
                        <TableCell className="font-medium">{award.title}</TableCell>
                        <TableCell>
                          <Badge>{award.year}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedAward(award)
                              setAwardForm({
                                title: award.title,
                                imageUrl: award.imageUrl,
                                year: award.year || new Date().getFullYear(),
                                order: award.order,
                              })
                              setAwardEditModal(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedAward(award)
                              setAwardDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Social Media */}
        <TabsContent value="sosial">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Kelola akun social media sekolah
                  </CardDescription>
                </div>
                <Button onClick={() => setSocialAddModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Social Media
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingSocial ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : socialMedia.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada social media
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {socialMedia.map((social) => (
                      <TableRow key={social.id}>
                        <TableCell>
                          <Badge variant="secondary">{social.platform}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{social.username}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {social.url}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedSocial(social)
                              setSocialForm({
                                platform: social.platform,
                                username: social.username,
                                url: social.url,
                              })
                              setSocialEditModal(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedSocial(social)
                              setSocialDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Modals */}
      <Dialog open={employeeAddModal} onOpenChange={setEmployeeAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Karyawan</DialogTitle>
            <DialogDescription>Tambah data karyawan baru</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="emp-name">Nama</Label>
              <Input
                id="emp-name"
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                placeholder="Nama lengkap"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-position">Posisi</Label>
              <Input
                id="emp-position"
                value={employeeForm.position}
                onChange={(e) => setEmployeeForm({ ...employeeForm, position: e.target.value })}
                placeholder="Contoh: Kepala Sekolah"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-level">Level</Label>
              <Select
                value={employeeForm.level}
                onValueChange={(value) => setEmployeeForm({ ...employeeForm, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih level" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-image">URL Foto (opsional)</Label>
              <Input
                id="emp-image"
                value={employeeForm.imageUrl}
                onChange={(e) => setEmployeeForm({ ...employeeForm, imageUrl: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmployeeAddModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleAddEmployee} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={employeeEditModal} onOpenChange={setEmployeeEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Karyawan</DialogTitle>
            <DialogDescription>Update data karyawan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="emp-edit-name">Nama</Label>
              <Input
                id="emp-edit-name"
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-edit-position">Posisi</Label>
              <Input
                id="emp-edit-position"
                value={employeeForm.position}
                onChange={(e) => setEmployeeForm({ ...employeeForm, position: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-edit-level">Level</Label>
              <Select
                value={employeeForm.level}
                onValueChange={(value) => setEmployeeForm({ ...employeeForm, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="emp-edit-image">URL Foto (opsional)</Label>
              <Input
                id="emp-edit-image"
                value={employeeForm.imageUrl}
                onChange={(e) => setEmployeeForm({ ...employeeForm, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmployeeEditModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleEditEmployee} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={employeeDeleteDialog} onOpenChange={setEmployeeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Karyawan?</AlertDialogTitle>
            <AlertDialogDescription>
              Data karyawan &quot;{selectedEmployee?.name}&quot; akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEmployee} disabled={submitting} className="bg-red-600 hover:bg-red-700">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</> : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Schedule Modals */}
      <Dialog open={scheduleAddModal} onOpenChange={setScheduleAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal</DialogTitle>
            <DialogDescription>Tambah jadwal kegiatan baru</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="sch-time">Waktu</Label>
              <Input
                id="sch-time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                placeholder="Contoh: 08:00 - 09:00"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sch-activity">Kegiatan</Label>
              <Input
                id="sch-activity"
                value={scheduleForm.activity}
                onChange={(e) => setScheduleForm({ ...scheduleForm, activity: e.target.value })}
                placeholder="Nama kegiatan"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleAddModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleAddSchedule} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={scheduleEditModal} onOpenChange={setScheduleEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Jadwal</DialogTitle>
            <DialogDescription>Update jadwal kegiatan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="sch-edit-time">Waktu</Label>
              <Input
                id="sch-edit-time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sch-edit-activity">Kegiatan</Label>
              <Input
                id="sch-edit-activity"
                value={scheduleForm.activity}
                onChange={(e) => setScheduleForm({ ...scheduleForm, activity: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleEditModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleEditSchedule} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={scheduleDeleteDialog} onOpenChange={setScheduleDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Jadwal?</AlertDialogTitle>
            <AlertDialogDescription>
              Jadwal &quot;{selectedSchedule?.activity}&quot; akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSchedule} disabled={submitting} className="bg-red-600 hover:bg-red-700">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</> : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Award Modals */}
      <Dialog open={awardAddModal} onOpenChange={setAwardAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Penghargaan</DialogTitle>
            <DialogDescription>Tambah data penghargaan baru</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="award-title">Judul Penghargaan</Label>
              <Input
                id="award-title"
                value={awardForm.title}
                onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                placeholder="Nama penghargaan"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="award-year">Tahun</Label>
              <Input
                id="award-year"
                type="number"
                value={awardForm.year}
                onChange={(e) => setAwardForm({ ...awardForm, year: parseInt(e.target.value) })}
                placeholder="2024"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="award-image">URL Gambar</Label>
              <Input
                id="award-image"
                value={awardForm.imageUrl}
                onChange={(e) => setAwardForm({ ...awardForm, imageUrl: e.target.value })}
                placeholder="https://example.com/award.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAwardAddModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleAddAward} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={awardEditModal} onOpenChange={setAwardEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Penghargaan</DialogTitle>
            <DialogDescription>Update data penghargaan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="award-edit-title">Judul Penghargaan</Label>
              <Input
                id="award-edit-title"
                value={awardForm.title}
                onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="award-edit-year">Tahun</Label>
              <Input
                id="award-edit-year"
                type="number"
                value={awardForm.year}
                onChange={(e) => setAwardForm({ ...awardForm, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="award-edit-image">URL Gambar</Label>
              <Input
                id="award-edit-image"
                value={awardForm.imageUrl}
                onChange={(e) => setAwardForm({ ...awardForm, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAwardEditModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleEditAward} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={awardDeleteDialog} onOpenChange={setAwardDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Penghargaan?</AlertDialogTitle>
            <AlertDialogDescription>
              Penghargaan &quot;{selectedAward?.title}&quot; akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAward} disabled={submitting} className="bg-red-600 hover:bg-red-700">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</> : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Social Media Modals */}
      <Dialog open={socialAddModal} onOpenChange={setSocialAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Social Media</DialogTitle>
            <DialogDescription>Tambah akun social media baru</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="social-platform">Platform</Label>
              <Input
                id="social-platform"
                value={socialForm.platform}
                onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                placeholder="Contoh: Instagram, Facebook"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="social-username">Username</Label>
              <Input
                id="social-username"
                value={socialForm.username}
                onChange={(e) => setSocialForm({ ...socialForm, username: e.target.value })}
                placeholder="@username"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="social-url">URL</Label>
              <Input
                id="social-url"
                value={socialForm.url}
                onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSocialAddModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleAddSocial} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={socialEditModal} onOpenChange={setSocialEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Social Media</DialogTitle>
            <DialogDescription>Update akun social media</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="social-edit-platform">Platform</Label>
              <Input
                id="social-edit-platform"
                value={socialForm.platform}
                onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="social-edit-username">Username</Label>
              <Input
                id="social-edit-username"
                value={socialForm.username}
                onChange={(e) => setSocialForm({ ...socialForm, username: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="social-edit-url">URL</Label>
              <Input
                id="social-edit-url"
                value={socialForm.url}
                onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSocialEditModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleEditSocial} disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={socialDeleteDialog} onOpenChange={setSocialDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Social Media?</AlertDialogTitle>
            <AlertDialogDescription>
              Akun {selectedSocial?.platform} &quot;{selectedSocial?.username}&quot; akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSocial} disabled={submitting} className="bg-red-600 hover:bg-red-700">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</> : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
