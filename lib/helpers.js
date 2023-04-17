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
