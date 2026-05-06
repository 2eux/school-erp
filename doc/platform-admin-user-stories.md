# Platform Admin — User Stories

These stories cover the platform-level administration layer: account registration, tenant (school) management, and membership (access control). They are written from the perspective of two actor types.

**Actors**

| Actor | Who they are |
|---|---|
| **Super Admin** | The platform operator. Manages all schools and all users across the system. |
| **School Owner** | A user who creates and owns one or more schools on the platform. |

---

## Authentication

---

**US-AUTH-01 — Register a platform account**

> As a new user,
> I want to create a platform account with my name, email, and password,
> so that I can log in and manage schools.

Acceptance criteria:
- I can submit first name, last name, email, and a password (minimum 6 characters).
- If the email is already in use, I see an error and am not registered twice.
- On success, I receive an access token and am immediately logged in.

---

**US-AUTH-02 — Log in to my platform account**

> As a registered user,
> I want to log in with my email and password,
> so that I can access the platform.

Acceptance criteria:
- I submit my email and password.
- If the credentials are correct and my account is active, I receive an access token.
- If the credentials are wrong, I see an error message.
- If my account has been deactivated, I cannot log in.

---

**US-AUTH-03 — View my own profile**

> As a logged-in user,
> I want to see my profile information,
> so that I can verify my details and see which schools I belong to.

Acceptance criteria:
- I can fetch my profile without providing my ID.
- The response includes my name, email, role, and a list of my school memberships.

---

## Users

---

**US-USER-01 — Create a platform user (admin action)**

> As a Super Admin,
> I want to create platform accounts for other users,
> so that I can onboard operators or school owners without them self-registering.

Acceptance criteria:
- I can specify first name, last name, email, password, and optionally assign a platform role.
- The new user receives a hashed password (not stored in plain text).
- Duplicate emails are rejected.

---

**US-USER-02 — List all platform users**

> As a Super Admin,
> I want to see a list of all registered platform users,
> so that I can audit who has access to the system.

Acceptance criteria:
- I can retrieve all users in one request.
- Regular users cannot access this list.

---

**US-USER-03 — View a specific user**

> As a Super Admin or the user themselves,
> I want to view a user's profile by their ID,
> so that I can inspect their details.

Acceptance criteria:
- A Super Admin can view any user.
- A regular user can only view their own profile.
- Requesting another user's profile as a regular user is rejected.

---

**US-USER-04 — Update my own profile**

> As a logged-in user,
> I want to update my first name or last name,
> so that my profile stays accurate.

Acceptance criteria:
- I can change my own first and last name.
- I cannot change my own platform role or active status — those fields are ignored if I send them.

---

**US-USER-05 — Promote or deactivate a user (admin action)**

> As a Super Admin,
> I want to change a user's platform role or deactivate their account,
> so that I can manage who has elevated access or revoke platform access without deleting the account.

Acceptance criteria:
- I can set another user's `platformRole` to `super_admin` or `user`.
- I can set `isActive` to `false` to prevent login without deleting their data.
- Regular users cannot perform these actions on anyone, including themselves.

---

**US-USER-06 — Delete a platform user**

> As a Super Admin,
> I want to permanently delete a user account,
> so that I can remove users who should no longer exist in the system.

Acceptance criteria:
- The user record is removed.
- Any memberships belonging to that user are also removed automatically.
- Only a Super Admin can perform this action.

---

## Tenants (Schools)

---

**US-TENANT-01 — Create a new school**

> As a logged-in user,
> I want to create a new school on the platform,
> so that I can set up a workspace for my institution.

Acceptance criteria:
- I provide a school name, a unique slug (short URL-friendly identifier), and optionally a custom domain.
- The system provisions a dedicated data space for that school automatically.
- I am automatically assigned as the Owner of the school.
- A Super Admin creating a school is not automatically assigned as owner (they manage the platform globally).

---

**US-TENANT-02 — View my schools**

> As a logged-in user,
> I want to see the list of schools I belong to,
> so that I know which workspaces I can access.

Acceptance criteria:
- I only see schools where I have a membership (owner, admin, or member).
- A Super Admin sees all schools on the platform.

---

**US-TENANT-03 — View a school's details**

> As a member of a school or a Super Admin,
> I want to view a school's details by its ID,
> so that I can inspect its name, slug, domain, and status.

Acceptance criteria:
- A Super Admin can view any school.
- A regular user can only view schools they are a member of.
- Requesting a school the user has no membership in is rejected.

---

**US-TENANT-04 — Update a school**

> As the Owner of a school or a Super Admin,
> I want to update the school's name, domain, or status,
> so that I can keep the school's information current.

Acceptance criteria:
- Only the school's Owner or a Super Admin can make changes.
- The slug and internal schema name cannot be changed after creation.
- Valid status transitions include activating, suspending, or archiving a school.
- Admins and Members cannot edit school settings.

---

**US-TENANT-05 — Delete a school**

> As a Super Admin,
> I want to permanently delete a school,
> so that I can remove institutions that are no longer using the platform.

Acceptance criteria:
- Only a Super Admin can delete a school.
- All data stored in that school's dedicated data space is permanently destroyed.
- All memberships associated with the school are removed automatically.
- This action is irreversible.

---

## Memberships

---

**US-MEMBER-01 — Invite a user to a school (admin action)**

> As a Super Admin,
> I want to add an existing platform user to a school with a specific role,
> so that they can access that school's workspace.

Acceptance criteria:
- I specify the user ID, the school ID, and a role (`owner`, `admin`, or `member`).
- A user cannot be added to the same school twice — a duplicate is rejected.
- The school must exist; an invalid school ID is rejected.

---

**US-MEMBER-02 — View members of a school**

> As an authenticated user,
> I want to see all members of a specific school,
> so that I know who has access to it.

Acceptance criteria:
- I provide the school's ID and receive a list of memberships including user details and roles.
- Results are ordered by when each membership was created.

---

**US-MEMBER-03 — View all schools a user belongs to**

> As an authenticated user,
> I want to look up all schools a given user is a member of,
> so that I can understand their access across the platform.

Acceptance criteria:
- I provide a user ID and receive their membership list including school details and roles.
- Results are ordered by when each membership was created.

---

**US-MEMBER-04 — Look up a specific membership**

> As an authenticated user,
> I want to retrieve a membership record by its ID,
> so that I can see the exact role a user holds in a school.

Acceptance criteria:
- I provide a membership ID and receive the full membership record.
- A not-found error is returned if the ID does not exist.

---

**US-MEMBER-05 — Change a member's role (admin action)**

> As a Super Admin,
> I want to change the role of an existing membership,
> so that I can promote a member to admin or demote an admin to member.

Acceptance criteria:
- I provide the membership ID and the new role.
- Only `owner`, `admin`, and `member` are valid role values.
- Only a Super Admin can change roles.

---

**US-MEMBER-06 — Remove a user from a school (admin action)**

> As a Super Admin,
> I want to remove a user's membership from a school,
> so that they can no longer access that school's workspace.

Acceptance criteria:
- The membership record is permanently deleted.
- The user's platform account is not affected.
- Only a Super Admin can remove memberships.

---

## Story Map Summary

```
Platform Admin
│
├── Authentication
│   ├── US-AUTH-01  Register account
│   ├── US-AUTH-02  Log in
│   └── US-AUTH-03  View own profile
│
├── Users
│   ├── US-USER-01  Create user            [Super Admin]
│   ├── US-USER-02  List all users         [Super Admin]
│   ├── US-USER-03  View user profile      [Super Admin / Self]
│   ├── US-USER-04  Update own profile     [Self]
│   ├── US-USER-05  Change role / deactivate [Super Admin]
│   └── US-USER-06  Delete user            [Super Admin]
│
├── Schools (Tenants)
│   ├── US-TENANT-01  Create school        [Any authenticated user]
│   ├── US-TENANT-02  List my schools      [Any authenticated user]
│   ├── US-TENANT-03  View school details  [Member / Super Admin]
│   ├── US-TENANT-04  Update school        [Owner / Super Admin]
│   └── US-TENANT-05  Delete school        [Super Admin]
│
└── Memberships
    ├── US-MEMBER-01  Add user to school    [Super Admin]
    ├── US-MEMBER-02  List school members   [Authenticated]
    ├── US-MEMBER-03  List user's schools   [Authenticated]
    ├── US-MEMBER-04  View membership       [Authenticated]
    ├── US-MEMBER-05  Change member role    [Super Admin]
    └── US-MEMBER-06  Remove from school   [Super Admin]
```
