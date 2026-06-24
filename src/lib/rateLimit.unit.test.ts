import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Ratelimit } from "@upstash/ratelimit";

// Importing @/src/lib/rateLimit runs Redis.fromEnv() at module load, which
// throws without env vars. Mock the Upstash modules so the import is
// side-effect-free.
vi.mock("@upstash/redis", () => ({ Redis: { fromEnv: () => ({}) } }));
vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    static slidingWindow() {
      return {};
    }
    limit() {
      return Promise.resolve({ success: true });
    }
  },
}));

import { isRateLimited } from "@/src/lib/rateLimit";

describe("isRateLimited", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when the limiter reports success", async () => {
    const limiter = {
      limit: vi.fn().mockResolvedValue({ success: true }),
    } as unknown as Ratelimit;

    expect(await isRateLimited(limiter, "user@test.com")).toBe(false);
    expect(limiter.limit).toHaveBeenCalledWith("user@test.com");
  });

  it("returns true when the limiter reports failure (over limit)", async () => {
    const limiter = {
      limit: vi.fn().mockResolvedValue({ success: false }),
    } as unknown as Ratelimit;

    expect(await isRateLimited(limiter, "user@test.com")).toBe(true);
  });

  it("fails open (returns false) and logs when the limiter throws", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const limiter = {
      limit: vi.fn().mockRejectedValue(new Error("upstash down")),
    } as unknown as Ratelimit;

    expect(await isRateLimited(limiter, "user@test.com")).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
  });
});
