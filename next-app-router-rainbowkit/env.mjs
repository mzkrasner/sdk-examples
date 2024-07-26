import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONTEXT_ID: z.string(),
    ENV_ID: z.string(),
    PRIVATE_DID_SEED: z.string(),
    PRIVATE_DID_SEED_2: z.string(),
    CUSTOM_EVENT_ID: z.string(),
    CUSTOM_EVENT_ID_2: z.string(),
  },
  client: {
    NEXT_PUBLIC_PROJECT_ID: z.string(),
  },
  runtimeEnv: {
    ENV_ID: process.env.ENV_ID,
    PRIVATE_DID_SEED: process.env.PRIVATE_DID_SEED,
    PRIVATE_DID_SEED_2: process.env.PRIVATE_DID_SEED_2,
    CUSTOM_EVENT_ID: process.env.CUSTOM_EVENT_ID,
    CONTEXT_ID: process.env.CONTEXT_ID,
    CUSTOM_EVENT_ID_2: process.env.CUSTOM_EVENT_ID_2,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  },
});
