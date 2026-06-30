import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock every dependency so no real auth / db / Upstash runs.
// vi.mock factories are hoisted above top-level vars, so build the shared
// mocks with vi.hoisted so the factories can reference them safely.
const { isRateLimited, addAdminLimiter, requireAdmin, auth, prisma } =
  vi.hoisted(() => ({
    isRateLimited: vi.fn(),
    addAdminLimiter: { __tag: "addAdminLimiter" },
    requireAdmin: vi.fn(),
    auth: vi.fn(),
    prisma: {
      admin: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    },
  }));

vi.mock("@/src/lib/rateLimit", () => ({
  isRateLimited,
  addAdminLimiter,
  requestEventLimiter: { __tag: "requestEventLimiter" },
}));

vi.mock("@/src/lib/auth/requireAdmin", () => ({
  requireAdmin,
  isAdmin: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth }));

vi.mock("@repo/db", () => ({ default: prisma }));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { addAdmin } from "@/src/app/api/admin/admin_actions";

describe("addAdmin rate-limiting wiring", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("short-circuits with the too-many-requests result when blocked", async () => {
    requireAdmin.mockResolvedValue({ user: { email: "admin@test.com" } });
    isRateLimited.mockResolvedValue(true);

    const result = await addAdmin("new@test.com");

    expect(result).toEqual({
      error: "Too many requests. Please try again later.",
    });
    expect(isRateLimited).toHaveBeenCalledWith(
      addAdminLimiter,
      "admin@test.com"
    );
    expect(prisma.admin.create).not.toHaveBeenCalled();
  });
});
