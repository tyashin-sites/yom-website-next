import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

// KV-backed incremental cache (port skill pitfall #1). The binding name MUST be
// NEXT_INC_CACHE_KV — OpenNext hardcodes it. See wrangler.jsonc.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
