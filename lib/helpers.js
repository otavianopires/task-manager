export function isAdminPage(pathname) {
  const adminPattern = /\/admin/;
  return adminPattern.test(pathname);
}

export function isAdmin(role) {
  const adminRoles = [ROLES.superadmin, ROLES.admin];
  return adminRoles.includes(role);
}

export const ROLES = {
	superadmin: "SUPERADMIN",
	admin: "ADMIN",
	user: "USER",
	unauthenticated: "UNAUTHENTICATED",
}

export const adminOptions = {
  role: ROLES.admin,
}

export const userOptions = {
  role: ROLES.user,
}

export const unauthenticatedOptions = {
  role: ROLES.unauthenticated,
}

export function formatDate(value) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(value);
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
}

export function formatDateTime(value) {
  const date = new Date(value);
  return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
}

export function formateInputDateTimeLocal(datetime) {
  const dt = new Date(datetime);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16)
}

export async function fetchData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}