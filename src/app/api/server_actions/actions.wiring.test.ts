import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock every dependency so no real auth / db / Upstash runs.
// vi.mock factories are hoisted above top-level vars, so build the shared
// mocks with vi.hoisted so the factories can reference them safely.
const { isRateLimited, requestEventLimiter, auth, prisma } = vi.hoisted(() => ({
  isRateLimited: vi.fn(),
  requestEventLimiter: { __tag: "requestEventLimiter" },
  auth: vi.fn(),
  prisma: {
    requestedEvent: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("@/src/lib/rateLimit", () => ({
  isRateLimited,
  requestEventLimiter,
  addAdminLimiter: { __tag: "addAdminLimiter" },
}));

vi.mock("@/auth", () => ({ auth }));

vi.mock("@/src/lib/db", () => ({ default: prisma }));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/src/lib/auth/requireAdmin", () => ({
  requireAdmin: vi.fn(),
  requireSession: vi.fn(),
  isAdmin: vi.fn(),
}));
vi.mock("@/src/lib/calendar/createCalendarAppointment", () => ({
  createCalendarAppointment: vi.fn(),
}));

import { requestEvent } from "@/src/app/api/server_actions/actions";

describe("requestEvent rate-limiting wiring", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("short-circuits with the too-many-requests result when blocked", async () => {
    auth.mockResolvedValue({ user: { email: "user@test.com" } });
    isRateLimited.mockResolvedValue(true);

    const result = await requestEvent({}, new FormData());

    expect(result).toEqual({
      closeModal: false,
      message: "",
      error: "Too many requests. Please try again later.",
    });
    expect(isRateLimited).toHaveBeenCalledWith(
      requestEventLimiter,
      "user@test.com"
    );
    expect(prisma.requestedEvent.create).not.toHaveBeenCalled();
  });
});
