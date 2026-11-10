import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;

const email = z
  .string()
  .trim()
  .min(1, "Email is required")
  .max(255, "Email must be under 255 characters")
  .email("Enter a valid email address");

export const loginSchema = z.object({
  email,
  password: z
    .string()
    .min(1, "Password is required")
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(128, "Password must be under 128 characters"),
  rememberMe: z.boolean().optional(),
});

export const forgotSchema = z.object({ email });

export type LoginInput = z.infer<typeof loginSchema>;
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Strip all whitespace from a pasted email (copy-paste often adds spaces/newlines). */
export function cleanPastedEmail(value: string): string {
  return value.replace(/\s+/g, "");
}

export function collectErrors<T extends Record<string, unknown>>(
  result: z.SafeParseReturnType<unknown, T>,
): FieldErrors<T> {
  if (result.success) return {};
  const errors: FieldErrors<T> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof T;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
