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

export function formatInputDateTimeLocal(datetime) {
  const date = new Date(datetime);
  return date.toISOString().substring(0, 19);
}

export async function fetchData(url = '', data = {}, method = 'GET') {
  // Create basic headers.
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  var options = {
    method: method,
    headers: headers
  };

  if ( (method === 'POST') || (method === 'PUT') ) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  return response.json();
}

export function applyThemeClassname(pathname) {
  if (isAdminPage(pathname)) {
    document.body.classList.remove('theme-default');
    document.body.classList.add('theme-admin');
  } else {
    document.body.classList.remove('theme-admin');
    document.body.classList.add('theme-default');
  }
}