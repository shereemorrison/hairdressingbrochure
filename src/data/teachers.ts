import type { Teacher, TeachersByYear } from "../types/teachers"

export const teachersData: Teacher[] = [
  // 1975
  { id: "1", name: "Peter Chamberlain", year: "1975", hasPhoto: false, role: "teacher" },
  { id: "2", name: "Olwyn Coates", year: "1975", hasPhoto: false, role: "teacher" },

  // 1975-1985
  { id: "3", name: "Kath Campbell", year: "1975-1985", hasPhoto: false, role: "teacher" },
  { id: "4", name: "Denise Dear", year: "1975-1985", hasPhoto: false, role: "teacher" },
  {
    id: "5",
    name: "Helen Hickey",
    year: "1975-1985",
    hasPhoto: false,
    role: "teacher",
  },
  {
    id: "6",
    name: "Vivian Farrugia",
    year: "1975-1985",
    hasPhoto: true,
    role: "teacher",
  },
  {
    id: "7",
    name: "Carla Ashman",
    year: "1975-1985",
    hasPhoto: true,
    role: "teacher",
  },
  { id: "8", name: "Kevin Downie", year: "1975-1985", hasPhoto: false, role: "teacher" },
  { id: "9", name: "Bernadette McEleavy", year: "1975-1985", hasPhoto: true, role: "teacher" },
  { id: "10", name: "Rod Hawkey", year: "1975-1985", hasPhoto: false, role: "teacher" },
  { id: "11", name: "Libby Brandrick", year: "1975-1985", hasPhoto: false, role: "teacher" },
  { id: "12", name: "Sue Hawkey", year: "1975-1985", hasPhoto: true, role: "teacher" },

  // 2000-current
  //   { id: "13", name: "Julie Curnow", year: "2000-current", hasPhoto: true, role: "teacher" },

  // 2000
  { id: "14", name: "Deb Burch", year: "2000", hasPhoto: true, role: "teacher" },
  { id: "42", name: "Julie Curnow", year: "2000", hasPhoto: false, role: "teacher" },

  // 2004
  { id: "15", name: "Vicki Frisk", year: "2004", hasPhoto: true, role: "teacher" },
  { id: "16", name: "Jacinta McGonigal", year: "2004", hasPhoto: true, role: "teacher" },

  // 2011
  { id: "17", name: "Wendy Fitzpatrick", year: "2011", hasPhoto: true, role: "teacher" },
  { id: "18", name: "Kellie Mennan", year: "2011", hasPhoto: false, role: "teacher" },
  { id: "19", name: "Agnes Benczik", year: "2011", hasPhoto: false, role: "teacher" },
  { id: "20", name: "Suzi Pedrotti", year: "2011", hasPhoto: true, role: "teacher" },
  { id: "21", name: "Autumn O'Connell", year: "2011", hasPhoto: false, role: "teacher" },
  { id: "22", name: "Andrea Forge", year: "2011", hasPhoto: false, role: "teacher" },
  { id: "23", name: "Barb Loader", year: "2011", hasPhoto: false, role: "teacher" },
  { id: "25", name: "Grant McKinnon", year: "2014", hasPhoto: true, role: "teacher" },

  // 2016
  { id: "24", name: "Alisha Weekley", year: "2016", hasPhoto: true, role: "teacher" },


  // 2017
  { id: "26", name: "Brianna Giddings", year: "2017", hasPhoto: false, role: "teacher" },
  { id: "43", name: "Kristie Weekley", year: "2017", hasPhoto: false, role: "teacher" },

  // 2018
  { id: "27", name: "Breanna Watson", year: "2018", hasPhoto: false, role: "teacher" },
  { id: "28", name: "Catherine Pedretti", year: "2018", hasPhoto: false, role: "teacher" },
  { id: "29", name: "Roz Bradley", year: "2018", hasPhoto: false, role: "teacher" },
  { id: "30", name: "Deneve Stratford", year: "2018", hasPhoto: false, role: "teacher" },
  { id: "31", name: "Ella Savy", year: "2018", hasPhoto: false, role: "teacher" },
  { id: "32", name: "Ange Richards", year: "2018", hasPhoto: false, role: "teacher" },

  // 2015
  { id: "33", name: "Julie Mott", year: "2013", hasPhoto: false, role: "teacher" },

  // 2020
  { id: "37", name: "Ange Richards", year: "2020", hasPhoto: false, role: "teacher" },

  // 2022
  { id: "34", name: "Kiera Gwin", year: "2022", hasPhoto: false, role: "teacher" },
  { id: "35", name: "Lauren McIlrath", year: "2022", hasPhoto: false, role: "teacher" },

  // 2023
  { id: "36", name: "Danica Orchard", year: "2023", hasPhoto: true, role: "teacher" },

  // 2024
  { id: "44", name: "Paige Wilson", year: "2024", hasPhoto: false, role: "teacher" },

  // 2025
  { id: "37", name: "Britt Whitten", year: "2025", hasPhoto: false, role: "teacher" },
  { id: "38", name: "Jocoba Tuohey", year: "2025", hasPhoto: false, role: "teacher" },

  // Receptionists
  { id: "39", name: "Gayle Jenkins", year: "Mentions", hasPhoto: false, role: "receptionist" },
  { id: "40", name: "Cathy Ritchie", year: "Mentions", hasPhoto: false, role: "receptionist" },
  { id: "41", name: "Connie Boyd", year: "Mentions", hasPhoto: false, role: "receptionist" },
]

export const teachers = teachersData

export const getTeachersByYear = (): TeachersByYear => {
  return teachersData.reduce((acc, teacher) => {
    if (!acc[teacher.year]) {
      acc[teacher.year] = []
    }
    acc[teacher.year].push(teacher)
    return acc
  }, {} as TeachersByYear)
}

export const getTeachersWithPhotos = (): Teacher[] => {
  return teachersData.filter((teacher) => teacher.hasPhoto)
}

export const getTeachersByRole = (role: "teacher" | "receptionist"): Teacher[] => {
  return teachersData.filter((teacher) => teacher.role === role)
}

export const getGroupedTeachersData = () => {
  const groups = [
    {
      period: "1975",
      teachers: teachersData.filter((t) => t.year === "1975"),
    },
    {
      period: "1975-1985",
      teachers: teachersData.filter((t) => t.year === "1975-1985"),
    },
    {
      period: "2000-current",
      teachers: teachersData.filter((t) => t.year === "2000-current"),
    },
    {
      period: "2000",
      teachers: teachersData.filter((t) => t.year === "2000"),
    },
    {
      period: "2004",
      teachers: teachersData.filter((t) => t.year === "2004"),
    },
    {
      period: "2011",
      teachers: teachersData.filter((t) => t.year === "2011"),
    },
    {
      period: "2016",
      teachers: teachersData.filter((t) => t.year === "2016"),
    },
    {
      period: "2017",
      teachers: teachersData.filter((t) => t.year === "2017"),
    },
    {
      period: "2018",
      teachers: teachersData.filter((t) => t.year === "2018"),
    },
    {
      period: "2019",
      teachers: teachersData.filter((t) => t.year === "2019"),
    },
    {
      period: "2020",
      teachers: teachersData.filter((t) => t.year === "2020"),
    },
    {
      period: "2022",
      teachers: teachersData.filter((t) => t.year === "2022"),
    },
    {
      period: "2023",
      teachers: teachersData.filter((t) => t.year === "2023"),
    },
    {
      period: "2025",
      teachers: teachersData.filter((t) => t.year === "2025"),
    },
    {
      period: "Receptionists",
      teachers: teachersData.filter((t) => t.role === "receptionist"),
    },
  ].filter((group) => group.teachers.length > 0)

  return groups
}
