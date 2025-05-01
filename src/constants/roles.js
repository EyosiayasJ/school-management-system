/**
 * System roles definition
 * Used for role-based access control throughout the application
 */

export const ROLES = {
  // Admin roles
  SUPER_ADMIN: 'SUPER_ADMIN',      // Has access to everything in the system
  SUPPORT_ADMIN: 'SUPPORT_ADMIN',  // Has access to support functions and limited school management
  
  // School staff roles
  BRANCH_DIRECTOR: 'BRANCH_DIRECTOR', // Manages a specific branch
  TEACHER: 'TEACHER',                // Has access to teaching-related features
  LIBRARIAN: 'LIBRARIAN',            // Manages library resources
  HEALTH_OFFICER: 'HEALTH_OFFICER',  // Manages health records
  
  // Student and parent roles
  STUDENT: 'STUDENT',  // Student access
  PARENT: 'PARENT'     // Parent/guardian access
};

/**
 * Role groups for easier permission checks
 */
export const ROLE_GROUPS = {
  // All admin roles
  ADMIN_ROLES: [ROLES.SUPER_ADMIN, ROLES.SUPPORT_ADMIN],
  
  // All school staff roles
  STAFF_ROLES: [ROLES.BRANCH_DIRECTOR, ROLES.TEACHER, ROLES.LIBRARIAN, ROLES.HEALTH_OFFICER],
  
  // All user roles
  USER_ROLES: [ROLES.STUDENT, ROLES.PARENT],
  
  // Roles that can access the internal admin portal
  INTERNAL_PORTAL_ROLES: [ROLES.SUPER_ADMIN, ROLES.SUPPORT_ADMIN],
  
  // Roles that can access the external school portal
  EXTERNAL_PORTAL_ROLES: [ROLES.BRANCH_DIRECTOR, ROLES.TEACHER, ROLES.LIBRARIAN, ROLES.HEALTH_OFFICER, ROLES.STUDENT, ROLES.PARENT]
};

/**
 * Helper function to check if a role belongs to a role group
 * @param {string} role - The role to check
 * @param {Array} roleGroup - The role group to check against
 * @returns {boolean} - Whether the role belongs to the group
 */
export const isInRoleGroup = (role, roleGroup) => {
  return roleGroup.includes(role);
};