```markdown
# school-erp Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the development conventions and workflows used in the `school-erp` TypeScript codebase. It covers file naming, import/export styles, commit patterns, and testing practices. By following these patterns, contributors can maintain consistency and quality across the project.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `studentService.ts`, `userController.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { getStudent } from './studentService';
    ```

### Export Style
- Use **named exports** to expose functions, classes, or constants.
  - Example:
    ```typescript
    // studentService.ts
    export function getStudent(id: string) { ... }
    export const STUDENT_ROLE = 'student';
    ```

### Commit Patterns
- Commit messages are **freeform** (no strict format), often with short, descriptive summaries (~64 characters).
  - Example: `add attendance tracking to student module`

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Implement the feature using TypeScript.
3. Use relative imports for any dependencies.
4. Export your functions or classes using named exports.
5. Write corresponding test files following the `*.test.*` pattern.
6. Commit changes with a clear, descriptive message.

### Fixing a Bug
**Trigger:** When resolving a bug or issue  
**Command:** `/fix-bug`

1. Locate the affected file(s).
2. Apply the necessary fix.
3. Update or add tests to cover the bug scenario.
4. Commit with a concise message describing the fix.

### Writing Tests
**Trigger:** When adding or updating tests  
**Command:** `/write-test`

1. Create a test file matching the `*.test.*` pattern (e.g., `studentService.test.ts`).
2. Write test cases for your functions or modules.
3. Use the project's (unknown) testing framework conventions.
4. Run tests to ensure correctness.

## Testing Patterns

- Test files follow the `*.test.*` naming pattern (e.g., `userController.test.ts`).
- The specific testing framework is **unknown**, but tests are colocated with or near the code they validate.
- Tests should cover both typical and edge-case scenarios for each exported function or module.

## Commands

| Command       | Purpose                              |
|---------------|--------------------------------------|
| /add-feature  | Steps to add a new feature/module    |
| /fix-bug      | Steps to fix a bug                   |
| /write-test   | Steps to write or update tests       |
```
