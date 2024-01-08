enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

enum UserRole {
  ADMIN,
  USER,
}

enum StatusProject {
  ON_TIME = 0,
  RISK = 1,
  PROGRESS_SLOW = 2,
  ON_HOLD = 3,
  CANCELLED = 4,
  COMPLETED = 5,
}

enum PermissionProject {
  ADMINISTRATOR = 0,
  MEMBER = 1,
}

export { Gender, PermissionProject, StatusProject, UserRole };
