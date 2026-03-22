import { createBrowserRouter } from "react-router";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/admin-console",
    Component: App,
  },
  {
    path: "/user-management",
    Component: App,
  },
  {
    path: "/user-management/:userId",
    Component: App,
  },
  {
    path: "/pending-role-assignments",
    Component: App,
  },
  {
    path: "/pending-role-requests",
    Component: App,
  },
  {
    path: "/add-role-assignment",
    Component: App,
  },
  {
    path: "/edit-role-assignment",
    Component: App,
  },
  {
    path: "/execution-planning/dashboard",
    Component: App,
  },
  {
    path: "/funding-distribution",
    Component: App,
  },
  {
    path: "/funding-authorization",
    Component: App,
  },
  {
    path: "/funding-work-plans",
    Component: App,
  },
  {
    path: "/apm-distribution",
    Component: App,
  },
  {
    path: "/activity-distribution",
    Component: App,
  },
  {
    path: "/apm-acceptance",
    Component: App,
  },
  {
    path: "/task-requirements-alignment",
    Component: App,
  },
  {
    path: "/task-requirements-alignment/:taskId",
    Component: App,
  },
  {
    path: "/task-planning/dashboard",
    Component: App,
  },
  {
    path: "/task-planning/tasks",
    Component: App,
  },
  {
    path: "/task-planning/tasks/:taskId",
    Component: App,
  },
  {
    path: "/reconciliation-report",
    Component: App,
  },
  {
    path: "/g-invoicing-report",
    Component: App,
  },
  {
    path: "/g-invoicing-reports",
    Component: App,
  },
  {
    path: "/g-invoice-performance-items",
    Component: App,
  },
  {
    path: "/activities",
    Component: App,
  },
  {
    path: "/activities/create",
    Component: App,
  },
  {
    path: "/projects",
    Component: App,
  },
  {
    path: "/projects/create",
    Component: App,
  },
  {
    path: "/system-appropriations",
    Component: App,
  },
  {
    path: "/system-appropriations/create",
    Component: App,
  },
  {
    path: "/tenant-appropriations",
    Component: App,
  },
  {
    path: "/tenant-appropriations/create",
    Component: App,
  },
  {
    path: "/audit-log",
    Component: App,
  },
]);