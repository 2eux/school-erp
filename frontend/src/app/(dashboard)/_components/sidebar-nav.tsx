import type { NavCategory } from "~/app/(dashboard)/_components/nav-main"
import {
  LayoutDashboard,
  LineChart,
  FileBarChart,
  Bell,
  Layers,
  ClipboardList,
  Award,
  BookMarked,
  Users,
  GraduationCap,
  UsersRound,
  Briefcase,
  Wallet,
  Bus,
  CalendarRange,
  Megaphone,
  HeartHandshake,
  Building2,
  Shield,
  Settings,
  CircleHelp,
  Search,
  Settings2,
  User,
} from "lucide-react"

/**
 * Category → menu → submenu (aligned with product IA).
 * Routes resolve via `/dashboard/[...slug]` until feature pages exist.
 */
export const sidebarNavCategories: NavCategory[] = [
  {
    label: "Dashboard",
    accentDot: "bg-violet-500",
    menus: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: LineChart,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: FileBarChart,
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
    ],
  },
  {
    label: "Academics",
    accentDot: "bg-emerald-500",
    menus: [
      {
        title: "Classes & subjects",
        url: "/dashboard/academics/classes",
        icon: Layers,
        items: [
          { title: "Class management", url: "/dashboard/academics/classes" },
          { title: "Subject management", url: "/dashboard/academics/subjects" },
          { title: "Timetable", url: "/dashboard/academics/timetable" },
          { title: "Curriculum", url: "/dashboard/academics/curriculum" },
        ],
      },
      {
        title: "Attendance",
        url: "/dashboard/academics/attendance",
        icon: ClipboardList,
        items: [
          { title: "Mark attendance", url: "/dashboard/academics/attendance/mark" },
          {
            title: "Attendance reports",
            url: "/dashboard/academics/attendance/reports",
          },
          {
            title: "Leave requests",
            url: "/dashboard/academics/attendance/leave-requests",
          },
        ],
      },
      {
        title: "Examinations",
        url: "/dashboard/academics/exams",
        icon: Award,
        items: [
          { title: "Exam schedule", url: "/dashboard/academics/exams/schedule" },
          {
            title: "Results & grades",
            url: "/dashboard/academics/exams/results",
          },
          {
            title: "Report cards",
            url: "/dashboard/academics/exams/report-cards",
          },
          { title: "Transcripts", url: "/dashboard/academics/exams/transcripts" },
        ],
      },
      {
        title: "Assignments",
        url: "/dashboard/academics/assignments",
        icon: BookMarked,
        items: [
          {
            title: "Create assignment",
            url: "/dashboard/academics/assignments/create",
          },
          {
            title: "Submissions",
            url: "/dashboard/academics/assignments/submissions",
          },
          {
            title: "Gradebook",
            url: "/dashboard/academics/assignments/gradebook",
          },
        ],
      },
    ],
  },
  {
    label: "People",
    accentDot: "bg-blue-500",
    menus: [
      {
        title: "Students",
        url: "/dashboard/people/students",
        icon: Users,
        items: [
          { title: "All students", url: "/dashboard/people/students" },
          { title: "Admissions", url: "/dashboard/people/students/admissions" },
          {
            title: "Enrollment",
            url: "/dashboard/people/students/enrollment",
          },
          {
            title: "Promotions",
            url: "/dashboard/people/students/promotions",
          },
          { title: "ID cards", url: "/dashboard/people/students/id-cards" },
        ],
      },
      {
        title: "Teachers",
        url: "/dashboard/people/teachers",
        icon: GraduationCap,
        items: [
          { title: "All teachers", url: "/dashboard/people/teachers" },
          {
            title: "Subject assignments",
            url: "/dashboard/people/teachers/subject-assignments",
          },
          {
            title: "Performance",
            url: "/dashboard/people/teachers/performance",
          },
        ],
      },
      {
        title: "Parents",
        url: "/dashboard/people/parents",
        icon: UsersRound,
        items: [
          { title: "Parent directory", url: "/dashboard/people/parents" },
          {
            title: "Parent portal access",
            url: "/dashboard/people/parents/portal",
          },
        ],
      },
      {
        title: "Staff",
        url: "/dashboard/people/staff",
        icon: Briefcase,
        items: [
          { title: "All staff", url: "/dashboard/people/staff" },
          {
            title: "Roles & departments",
            url: "/dashboard/people/staff/roles-departments",
          },
          {
            title: "Leave management",
            url: "/dashboard/people/staff/leave",
          },
        ],
      },
    ],
  },
  {
    label: "Operations",
    accentDot: "bg-orange-500",
    menus: [
      {
        title: "Finance",
        url: "/dashboard/operations/finance/fees",
        icon: Wallet,
        items: [
          {
            title: "Fees & pricing",
            url: "/dashboard/operations/finance/fees",
          },
          {
            title: "Invoices & payments",
            url: "/dashboard/operations/finance/invoices",
          },
          {
            title: "Discounts & waivers",
            url: "/dashboard/operations/finance/discounts",
          },
          {
            title: "Expense tracking",
            url: "/dashboard/operations/finance/expenses",
          },
          { title: "Payroll", url: "/dashboard/operations/finance/payroll" },
          {
            title: "Financial reports",
            url: "/dashboard/operations/finance/reports",
          },
        ],
      },
      {
        title: "Campus services",
        url: "/dashboard/operations/campus/transport",
        icon: Bus,
        items: [
          {
            title: "Transport",
            url: "/dashboard/operations/campus/transport",
          },
          { title: "Library", url: "/dashboard/operations/campus/library" },
          {
            title: "Inventory",
            url: "/dashboard/operations/campus/inventory",
          },
          { title: "Hostel", url: "/dashboard/operations/campus/hostel" },
          {
            title: "Cafeteria",
            url: "/dashboard/operations/campus/cafeteria",
          },
        ],
      },
      {
        title: "Events",
        url: "/dashboard/operations/events/calendar",
        icon: CalendarRange,
        items: [
          {
            title: "Calendar",
            url: "/dashboard/operations/events/calendar",
          },

          {
            title: "School events",
            url: "/dashboard/operations/events/school",
          },
          {
            title: "Holidays",
            url: "/dashboard/operations/events/holidays",
          },
        ],
      },
    ],
  },
  {
    label: "Communication",
    accentDot: "bg-yellow-500",
    menus: [
      {
        title: "Outreach",
        url: "/dashboard/communication/outreach/announcements",
        icon: Megaphone,
        items: [
          {
            title: "Announcements",
            url: "/dashboard/communication/outreach/announcements",
          },
          {
            title: "Messages",
            url: "/dashboard/communication/outreach/messages",
          },
          {
            title: "SMS & email alerts",
            url: "/dashboard/communication/outreach/alerts",
          },

          {
            title: "Notice board",
            url: "/dashboard/communication/outreach/notice-board",
          },
        ],
      },
      {
        title: "Parent engagement",
        url: "/dashboard/communication/parent-engagement/meetings",
        icon: HeartHandshake,
        items: [
          {
            title: "Parent meetings",
            url: "/dashboard/communication/parent-engagement/meetings",
          },
          {
            title: "Progress sharing",
            url: "/dashboard/communication/parent-engagement/progress",
          },
        ],
      },
    ],
  },
  {
    label: "Administration",
    accentDot: "bg-zinc-400",
    menus: [
      {
        title: "School setup",
        url: "/dashboard/admin/school-setup/profile",
        icon: Building2,
        items: [
          {
            title: "School profile",
            url: "/dashboard/admin/school-setup/profile",
          },
          {
            title: "Academic years & terms",
            url: "/dashboard/admin/school-setup/academic-years",
          },
          {
            title: "Departments",
            url: "/dashboard/admin/school-setup/departments",
          },
          { title: "Branches", url: "/dashboard/admin/school-setup/branches" },
        ],
      },
      {
        title: "Users & access",
        url: "/dashboard/admin/users-access/users",
        icon: Shield,
        items: [
          {
            title: "User management",
            url: "/dashboard/admin/users-access/users",
          },
          {
            title: "Roles & permissions",
            url: "/dashboard/admin/users-access/roles",
          },
          {
            title: "Audit logs",
            url: "/dashboard/admin/users-access/audit-logs",
          },
        ],
      },
      {
        title: "System",
        url: "/dashboard/admin/system/integrations",
        icon: Settings,
        items: [
          {
            title: "Integrations",
            url: "/dashboard/admin/system/integrations",
          },
          {
            title: "Backup & restore",
            url: "/dashboard/admin/system/backup",
          },
          {
            title: "System settings",
            url: "/dashboard/admin/system/settings",
          },
        ],
      },
    ],
  },
]

export const sidebarSecondaryNav = [
  {
    title: "Profile",
    url: "/profile",
    icon: <User className="size-4" />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings2 className="size-4" />,
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: <CircleHelp className="size-4" />,
  },
  {
    title: "Search",
    url: "#",
    icon: <Search className="size-4" />,
  },
]
