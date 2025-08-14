export interface Teacher {
  id: string
  name: string
  year: string
  hasPhoto: boolean
  photoImport?: string
  role?: "teacher" | "receptionist"
}

export interface TeachersByYear {
  [year: string]: Teacher[]
}
