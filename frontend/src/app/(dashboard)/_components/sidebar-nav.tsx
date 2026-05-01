import type { NavCategory } from "~/app/(dashboard)/_components/nav-main"
import {
  LayoutDashboard,
  LineChart,
  FileBarChart,
  ClipboardList,
  Award,
  Users,
  UsersRound,
  Briefcase,
  Wallet,
  Bus,
  Library,
  Hotel,
  Package,
  UtensilsCrossed,
  ShieldCheck,
  CalendarRange,
  Megaphone,
  HeartHandshake,
  Building2,
  Shield,
  Settings,
  Plug,
  CircleHelp,
  Ticket,
  Sparkles,
  Search,
  Settings2,
  User,
  School,
  BookOpen,
  BookMarked,
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
        url: "/dashboard/overview",
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
        url: "/dashboard/reports/academic",
        icon: FileBarChart,
        items: [
          {
            title: "Academic Reports",
            url: "/dashboard/reports/academic",
          },
          {
            title: "Attendance Reports",
            url: "/dashboard/reports/attendance",
          },
          {
            title: "Finance Reports",
            url: "/dashboard/reports/finance",
          },
          {
            title: "HR Reports",
            url: "/dashboard/reports/hr",
          },
          {
            title: "Transport Reports",
            url: "/dashboard/reports/transport",
          },
          {
            title: "Custom Reports",
            url: "/dashboard/reports/custom",
          },
          {
            title: "Data Export",
            url: "/dashboard/reports/data-export",
          },
        ],
      },
    ],
  },
  {
    label: "Academics",
    accentDot: "bg-emerald-500",
    menus: [
      {
        title: "Admissions",
        url: "/dashboard/academics/admissions/inquiries",
        icon: School,
        items: [
          {
            title: "Inquiries / Leads",
            url: "/dashboard/academics/admissions/inquiries",
          },
          {
            title: "Applications",
            url: "/dashboard/academics/admissions/applications",
          },
          {
            title: "Enrollment",
            url: "/dashboard/academics/admissions/enrollment",
          },
          {
            title: "Document Verification",
            url: "/dashboard/academics/admissions/document-verification",
          },
          {
            title: "Waiting List",
            url: "/dashboard/academics/admissions/waiting-list",
          },
          {
            title: "Scholarship Applications",
            url: "/dashboard/academics/admissions/scholarships",
          },
        ],
      },
      {
        title: "Programs & teaching",
        url: "/dashboard/academics/classes",
        icon: BookOpen,
        items: [
          {
            title: "Classes / Sections",
            url: "/dashboard/academics/classes",
          },
          { title: "Subjects", url: "/dashboard/academics/subjects" },
          { title: "Curriculum", url: "/dashboard/academics/curriculum" },
          {
            title: "Lesson Plans",
            url: "/dashboard/academics/lesson-plans",
          },
          { title: "Timetable", url: "/dashboard/academics/timetable" },
          {
            title: "Homework",
            url: "/dashboard/academics/homework",
          },
          {
            title: "Online Classes",
            url: "/dashboard/academics/online-classes",
          },
          {
            title: "Study Materials",
            url: "/dashboard/academics/study-materials",
          },
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
            title: "Marks Entry",
            url: "/dashboard/academics/exams/marks-entry",
          },
          {
            title: "Grades & GPA",
            url: "/dashboard/academics/exams/grades-gpa",
          },
          {
            title: "Report Cards",
            url: "/dashboard/academics/exams/report-cards",
          },
          {
            title: "Transcripts",
            url: "/dashboard/academics/exams/transcripts",
          },
          {
            title: "Result Publish",
            url: "/dashboard/academics/exams/result-publish",
          },
          {
            title: "Certificates",
            url: "/dashboard/academics/exams/certificates",
          },
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
          {
            title: "Student Directory",
            url: "/dashboard/people/students",
          },
          {
            title: "Admission Records",
            url: "/dashboard/people/students/admission-records",
          },
          {
            title: "Student Profiles",
            url: "/dashboard/people/students/profiles",
          },
          {
            title: "Attendance",
            url: "/dashboard/people/students/attendance",
          },
          {
            title: "Discipline / Behavior",
            url: "/dashboard/people/students/discipline",
          },
          {
            title: "Health Records",
            url: "/dashboard/people/students/health-records",
          },
          { title: "ID Cards", url: "/dashboard/people/students/id-cards" },
          {
            title: "Promotions / Transfers",
            url: "/dashboard/people/students/promotions-transfers",
          },
          { title: "Alumni", url: "/dashboard/people/students/alumni" },
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
          {
            title: "Parent Meetings",
            url: "/dashboard/people/parents/meetings",
          },
          {
            title: "Consent Forms",
            url: "/dashboard/people/parents/consent-forms",
          }
        ],
      },
      {
        title: "Staff & HR",
        url: "/dashboard/people/staff",
        icon: Briefcase,
        items: [
          {
            title: "Staff Directory",
            url: "/dashboard/people/staff",
          },
          {
            title: "Teachers",
            url: "/dashboard/people/teachers",
          },
          {
            title: "Departments",
            url: "/dashboard/people/staff/departments",
          },
          {
            title: "Designations",
            url: "/dashboard/people/staff/designations",
          },
          {
            title: "Attendance",
            url: "/dashboard/people/staff/attendance",
          },
          {
            title: "Leave Management",
            url: "/dashboard/people/staff/leave",
          },
          {
            title: "Payroll",
            url: "/dashboard/people/staff/payroll",
          },
          {
            title: "Performance Reviews",
            url: "/dashboard/people/staff/performance-reviews",
          },
          {
            title: "Recruitment",
            url: "/dashboard/people/staff/recruitment",
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
        url: "/dashboard/operations/finance",
        icon: Wallet,
        items: [
          {
            title: "Fee Structure",
            url: "/dashboard/operations/finance/fee-structure",
          },
          {
            title: "Discounts / Waivers",
            url: "/dashboard/operations/finance/discounts-waivers",
          },
          {
            title: "Scholarships",
            url: "/dashboard/operations/finance/scholarships",
          },
          {
            title: "Invoices",
            url: "/dashboard/operations/finance/invoices",
          },
          {
            title: "Payments",
            url: "/dashboard/operations/finance/payments",
          },
          {
            title: "Due Collection",
            url: "/dashboard/operations/finance/due-collection",
          },
          {
            title: "Refunds",
            url: "/dashboard/operations/finance/refunds",
          },
          {
            title: "Expense Management",
            url: "/dashboard/operations/finance/expense-management",
          },
          {
            title: "Budgeting",
            url: "/dashboard/operations/finance/budgeting",
          },
          {
            title: "Accounting Ledger",
            url: "/dashboard/operations/finance/accounting-ledger",
          },
          {
            title: "Financial Reports",
            url: "/dashboard/operations/finance/financial-reports",
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
    label: "Campus Services",
    accentDot: "bg-cyan-500",
    menus: [
      {
        title: "Transport",
        url: "/dashboard/operations/campus/transport",
        icon: Bus,
        items: [
          {
            title: "Vehicles",
            url: "/dashboard/operations/campus/transport/vehicles",
          },
          {
            title: "Routes",
            url: "/dashboard/operations/campus/transport/routes",
          },
          {
            title: "Stops",
            url: "/dashboard/operations/campus/transport/stops",
          },
          {
            title: "Transport Fees",
            url: "/dashboard/operations/campus/transport/fees",
          },
        ],
      },
      {
        title: "Library",
        url: "/dashboard/operations/campus/library/books",
        icon: Library,
        items: [
          {
            title: "Books",
            url: "/dashboard/operations/campus/library/books",
          },
          {
            title: "Categories",
            url: "/dashboard/operations/campus/library/categories",
          },
          {
            title: "Issue / Return",
            url: "/dashboard/operations/campus/library/issue-return",
          },
          {
            title: "Fines",
            url: "/dashboard/operations/campus/library/fines",
          },
        ],
      },
      {
        title: "Hostel",
        url: "/dashboard/operations/campus/hostel/rooms",
        icon: Hotel,
        items: [
          {
            title: "Rooms",
            url: "/dashboard/operations/campus/hostel/rooms",
          },
          {
            title: "Allocations",
            url: "/dashboard/operations/campus/hostel/allocations",
          },
          {
            title: "Hostel Fees",
            url: "/dashboard/operations/campus/hostel/fees",
          },
        ],
      },
      {
        title: "Inventory",
        url: "/dashboard/operations/campus/inventory/assets",
        icon: Package,
        items: [
          {
            title: "Assets",
            url: "/dashboard/operations/campus/inventory/assets",
          },
          {
            title: "Stock Items",
            url: "/dashboard/operations/campus/inventory/stock-items",
          },
          {
            title: "Purchase Orders",
            url: "/dashboard/operations/campus/inventory/purchase-orders",
          },
          {
            title: "Suppliers",
            url: "/dashboard/operations/campus/inventory/suppliers",
          },
        ],
      },
      {
        title: "Cafeteria",
        url: "/dashboard/operations/campus/cafeteria",
        icon: UtensilsCrossed,
      },
      {
        title: "Security / Gate Pass",
        url: "/dashboard/operations/campus/security-gate-pass",
        icon: ShieldCheck,
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
            title: "Email Campaigns",
            url: "/dashboard/communication/outreach/email-campaigns",
          },
          {
            title: "SMS / WhatsApp",
            url: "/dashboard/communication/outreach/alerts",
          },
          {
            title: "Push Notifications",
            url: "/dashboard/communication/outreach/push-notifications",
          },
          {
            title: "Notice board",
            url: "/dashboard/communication/outreach/notice-board",
          },
          {
            title: "Outreach / CRM",
            url: "/dashboard/communication/outreach/outreach-crm",
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
            title: "Schools / Branches",
            url: "/dashboard/admin/schools-branches",
          },
          {
            title: "School profile",
            url: "/dashboard/admin/school-setup/profile",
          },
          {
            title: "Academic Years",
            url: "/dashboard/admin/school-setup/academic-years",
          },
          {
            title: "Terms / Semesters",
            url: "/dashboard/admin/school-setup/terms-semesters",
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
        title: "Integrations",
        url: "/dashboard/admin/integrations/payment-gateways",
        icon: Plug,
        items: [
          {
            title: "Payment Gateways",
            url: "/dashboard/admin/integrations/payment-gateways",
          },
          {
            title: "SMS Providers",
            url: "/dashboard/admin/integrations/sms-providers",
          },
          {
            title: "Email Providers",
            url: "/dashboard/admin/integrations/email-providers",
          },
          {
            title: "Video Conferencing",
            url: "/dashboard/admin/integrations/video-conferencing",
          },
          {
            title: "LMS Integrations",
            url: "/dashboard/admin/integrations/lms",
          },
          {
            title: "API Keys / Webhooks",
            url: "/dashboard/admin/integrations/api-keys-webhooks",
          },
        ],
      },
      {
        title: "System",
        url: "/dashboard/admin/workflow-automation",
        icon: Settings,
        items: [
          {
            title: "Workflow Automation",
            url: "/dashboard/admin/workflow-automation",
          },
          {
            title: "Custom Fields",
            url: "/dashboard/admin/custom-fields",
          },
          {
            title: "Templates",
            url: "/dashboard/admin/templates",
          },
          {
            title: "Backup & Restore",
            url: "/dashboard/admin/system/backup",
          },
          {
            title: "Subscription / Billing",
            url: "/dashboard/admin/subscription-billing",
          },
          {
            title: "System Settings",
            url: "/dashboard/admin/system/settings",
          },
        ],
      },
    ],
  },
  {
    label: "Support",
    accentDot: "bg-sky-500",
    menus: [
      {
        title: "Help Center",
        url: "/dashboard/support/help-center",
        icon: CircleHelp,
      },
      {
        title: "Tickets",
        url: "/dashboard/support/tickets",
        icon: Ticket,
      },
      {
        title: "Product Updates",
        url: "/dashboard/support/product-updates",
        icon: Sparkles,
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
]
