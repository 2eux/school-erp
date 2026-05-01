# Dashboard menu structure

Authoritative mapping lives in `frontend/src/app/(dashboard)/_components/sidebar-nav.tsx` (`sidebarNavCategories`). Routes below use the app base path **`/dashboard`** (many screens are placeholders via `[...slug]` until built).

Legend: **menu** → optional **submenu** (indented).

---

## Dashboard

| Accent | `bg-violet-500` |

- **Overview** → `/dashboard/overview`
- **Analytics** → `/dashboard/analytics`
- **Reports** → `/dashboard/reports/academic`
  - Academic Reports → `/dashboard/reports/academic`
  - Attendance Reports → `/dashboard/reports/attendance`
  - Finance Reports → `/dashboard/reports/finance`
  - HR Reports → `/dashboard/reports/hr`
  - Transport Reports → `/dashboard/reports/transport`
  - Custom Reports → `/dashboard/reports/custom`
  - Data Export → `/dashboard/reports/data-export`

---

## Academics

| Accent | `bg-emerald-500` |

- **Admissions** → `/dashboard/academics/admissions/inquiries`
  - Inquiries / Leads → `…/inquiries`
  - Applications → `…/applications`
  - Enrollment → `…/enrollment`
  - Document Verification → `…/document-verification`
  - Waiting List → `…/waiting-list`
  - Scholarship Applications → `…/scholarships`

- **Programs & teaching** → `/dashboard/academics/classes`
  - Classes / Sections → `/dashboard/academics/classes`
  - Subjects → `/dashboard/academics/subjects`
  - Curriculum → `/dashboard/academics/curriculum`
  - Lesson Plans → `/dashboard/academics/lesson-plans`
  - Timetable → `/dashboard/academics/timetable`
  - Homework → `/dashboard/academics/homework`
  - Online Classes → `/dashboard/academics/online-classes`
  - Study Materials → `/dashboard/academics/study-materials`

- **Attendance** → `/dashboard/academics/attendance`
  - Mark attendance → `…/mark`
  - Attendance reports → `…/reports`
  - Leave requests → `…/leave-requests`

- **Examinations** → `/dashboard/academics/exams`
  - Exam schedule → `/dashboard/academics/exams/schedule`
  - Marks Entry → `…/marks-entry`
  - Grades & GPA → `…/grades-gpa`
  - Report Cards → `…/report-cards`
  - Transcripts → `…/transcripts`
  - Result Publish → `…/result-publish`
  - Certificates → `…/certificates`

- **Assignments** → `/dashboard/academics/assignments`
  - Create assignment → `…/create`
  - Submissions → `…/submissions`
  - Gradebook → `…/gradebook`

---

## People

| Accent | `bg-blue-500` |

- **Students** → `/dashboard/people/students`
  - Student Directory → `/dashboard/people/students`
  - Admission Records → `…/admission-records`
  - Student Profiles → `…/profiles`
  - Attendance → `…/attendance`
  - Discipline / Behavior → `…/discipline`
  - Health Records → `…/health-records`
  - ID Cards → `…/id-cards`
  - Promotions / Transfers → `…/promotions-transfers`
  - Alumni → `…/alumni`

- **Parents** → `/dashboard/people/parents`
  - Parent directory → `/dashboard/people/parents`
  - Parent portal access → `…/portal`
  - Parent Meetings → `…/meetings`
  - Consent Forms → `…/consent-forms`

- **Staff & HR** → `/dashboard/people/staff`
  - Staff Directory → `/dashboard/people/staff`
  - Teachers → `/dashboard/people/teachers`
  - Departments → `…/departments`
  - Designations → `…/designations`
  - Attendance → `…/attendance`
  - Leave Management → `…/leave`
  - Payroll → `…/payroll`
  - Performance Reviews → `…/performance-reviews`
  - Recruitment → `…/recruitment`

---

## Operations

| Accent | `bg-orange-500` |

- **Finance** → `/dashboard/operations/finance`
  - Fee Structure → `/dashboard/operations/finance/fee-structure`
  - Discounts / Waivers → `…/discounts-waivers`
  - Scholarships → `…/scholarships`
  - Invoices → `…/invoices`
  - Payments → `…/payments`
  - Due Collection → `…/due-collection`
  - Refunds → `…/refunds`
  - Expense Management → `…/expense-management`
  - Budgeting → `…/budgeting`
  - Accounting Ledger → `…/accounting-ledger`
  - Financial Reports → `…/financial-reports`

- **Events** → `/dashboard/operations/events/calendar`
  - Calendar → `/dashboard/operations/events/calendar`
  - School events → `…/school`
  - Holidays → `…/holidays`

---

## Campus Services

| Accent | `bg-cyan-500` |

- **Transport** → `/dashboard/operations/campus/transport`
  - Vehicles → `…/transport/vehicles`
  - Routes → `…/transport/routes`
  - Stops → `…/transport/stops`
  - Transport Fees → `…/transport/fees`

- **Library** → `/dashboard/operations/campus/library/books`
  - Books → `…/library/books`
  - Categories → `…/library/categories`
  - Issue / Return → `…/library/issue-return`
  - Fines → `…/library/fines`

- **Hostel** → `/dashboard/operations/campus/hostel/rooms`
  - Rooms → `…/hostel/rooms`
  - Allocations → `…/hostel/allocations`
  - Hostel Fees → `…/hostel/fees`

- **Inventory** → `/dashboard/operations/campus/inventory/assets`
  - Assets → `…/inventory/assets`
  - Stock Items → `…/inventory/stock-items`
  - Purchase Orders → `…/inventory/purchase-orders`
  - Suppliers → `…/inventory/suppliers`

- **Cafeteria** → `/dashboard/operations/campus/cafeteria`
- **Security / Gate Pass** → `/dashboard/operations/campus/security-gate-pass`

---

## Communication

| Accent | `bg-yellow-500` |

- **Outreach** → `/dashboard/communication/outreach/announcements`
  - Announcements → `/dashboard/communication/outreach/announcements`
  - Messages → `…/messages`
  - Email Campaigns → `…/email-campaigns`
  - SMS / WhatsApp → `…/alerts`
  - Push Notifications → `…/push-notifications`
  - Notice board → `…/notice-board`
  - Outreach / CRM → `…/outreach-crm`

- **Parent engagement** → `/dashboard/communication/parent-engagement/meetings`
  - Parent meetings → `…/meetings`
  - Progress sharing → `…/progress`

---

## Administration

| Accent | `bg-zinc-400` |

- **School setup** → `/dashboard/admin/school-setup/profile`
  - Schools / Branches → `/dashboard/admin/schools-branches`
  - School profile → `/dashboard/admin/school-setup/profile`
  - Academic Years → `/dashboard/admin/school-setup/academic-years`
  - Terms / Semesters → `/dashboard/admin/school-setup/terms-semesters`
  - Departments → `/dashboard/admin/school-setup/departments`
  - Branches → `/dashboard/admin/school-setup/branches`

- **Users & access** → `/dashboard/admin/users-access/users`
  - User management → `/dashboard/admin/users-access/users`
  - Roles & permissions → `/dashboard/admin/users-access/roles`
  - Audit logs → `/dashboard/admin/users-access/audit-logs`

- **Integrations** → `/dashboard/admin/integrations/payment-gateways`
  - Payment Gateways → `/dashboard/admin/integrations/payment-gateways`
  - SMS Providers → `…/sms-providers`
  - Email Providers → `…/email-providers`
  - Video Conferencing → `…/video-conferencing`
  - LMS Integrations → `…/lms`
  - API Keys / Webhooks → `…/api-keys-webhooks`

- **System** → `/dashboard/admin/workflow-automation`
  - Workflow Automation → `/dashboard/admin/workflow-automation`
  - Custom Fields → `/dashboard/admin/custom-fields`
  - Templates → `/dashboard/admin/templates`
  - Backup & Restore → `/dashboard/admin/system/backup`
  - Subscription / Billing → `/dashboard/admin/subscription-billing`
  - System Settings → `/dashboard/admin/system/settings`

---

## Support

| Accent | `bg-sky-500` |

- **Help Center** → `/dashboard/support/help-center`
- **Tickets** → `/dashboard/support/tickets`
- **Product Updates** → `/dashboard/support/product-updates`

---

## Sidebar footer (secondary)

Defined in `sidebarSecondaryNav` (same file):

- **Profile** → `/profile`
- **Settings** → `/dashboard/settings`

---

## Related

- Navigation rendering & filters: `frontend/src/app/(dashboard)/_components/nav-main.tsx`
- Product features overview: `doc/features.md`
