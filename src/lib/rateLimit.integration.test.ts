import "dotenv/config";
import { describe, it, expect } from "vitest";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasCreds =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

describe.skipIf(!hasCreds)("rate limiter integration (real Upstash)", () => {
  it("allows 5 then blocks the 6th in-window", async () => {
    const limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:test",
    });
    const id = `it-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const results: boolean[] = [];
    for (let i = 0; i < 6; i++) {
      results.push((await limiter.limit(id)).success);
    }
    expect(results.slice(0, 5).every(Boolean)).toBe(true);
    expect(results[5]).toBe(false);
  });
});
