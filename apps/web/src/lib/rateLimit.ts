import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv(); // reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN

export const requestEventLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "rl:requestEvent",
});

export const addAdminLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  prefix: "rl:addAdmin",
});

/**
 * Returns true if the identifier is OVER the limit (should be blocked).
 * Fails open: if the limiter throws (e.g. Upstash unreachable / env missing),
 * logs and returns false so legitimate requests are not broken by an outage.
 */
export async function isRateLimited(
  limiter: Ratelimit,
  identifier: string
): Promise<boolean> {
  try {
    const { success } = await limiter.limit(identifier);
    return !success;
  } catch (e) {
    console.error("Rate limit check failed, allowing request:", e);
    return false;
  }
}
