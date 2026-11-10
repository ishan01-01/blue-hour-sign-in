import { describe, expect, it } from "vitest";

import { cleanPastedEmail, forgotSchema, loginSchema } from "@/lib/auth-schemas";

describe("login validation", () => {
  it("rejects passwords shorter than 8 characters", () => {
    const r = loginSchema.safeParse({ email: "a@b.com", password: "1234567" });
    expect(r.success).toBe(false);
  });

  it("accepts an 8-character password with a valid email", () => {
    const r = loginSchema.safeParse({ email: "a@b.com", password: "12345678" });
    expect(r.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(loginSchema.safeParse({ email: "not-an-email", password: "12345678" }).success).toBe(
      false,
    );
    expect(forgotSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("strips whitespace from pasted emails", () => {
    expect(cleanPastedEmail("  jane@ example.com\n")).toBe("jane@example.com");
  });
});
