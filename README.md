 Multi-Tenant Analytics Dashboard 🚀

A modern SaaS-ready, multi-tenant real-time analytics platform built using **Next.js 14+ App Router**, **Tailwind CSS**, and **TypeScript**. This dashboard supports multiple organizations (tenants), role-based access control (RBAC), dynamic widget rendering, and real-time updates.

---

## ✨ Features

- ✅ Multi-Tenant Routing (`/[tenant]/dashboard`)
- 🔒 Role-Based Access Control (Admin, Manager, Viewer)
- 📊 Reusable Real-Time Widget System
- 🎨 Tenant-Specific Themes and Branding
- ⚡ Performance-Optimized with SWR & Memoization
- 📁 Organized with Component-Driven Architecture
- ☁️ Ready for Vercel or Custom Deployment

---

## 🏗️ Tech Stack

- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data Management: SWR (Simulated Real-Time)
- Routing: Dynamic Multi-Tenant Structure

---

## 📂 Folder Structure
app/
└── [tenant]/
├── dashboard/
├── settings/
└── users/
components/
hooks/
lib/
middleware.ts
tailwind.config.ts



 🔐 User Roles

| Role     | Access Level                                |
|----------|---------------------------------------------|
| Admin    | Full access to all widgets and user control |
| Manager  | Limited access to departmental widgets      |
| Viewer   | Read-only access to assigned widgets        |

---

## 🧪 Performance

- Widget updates simulated every 5 seconds
- Optimized using `React.memo`, `useMemo`, and `SWR` cache
- Initial load time: ~180ms on Vercel edge runtime

---

## 🚀 Getting Started

### 1. Clone Install and Run the repository 

```bash
git clone https://github.com/Ijeh06/multi-tenant-analytic-Dashboard.git

cd multi-tenant-analytic-Dashboard

npm install

npm run dev

Visit: localhost:3000/
