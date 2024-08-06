import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONTEXT_ID: z.string(),
    ENV_ID: z.string(),
    PRIVATE_DID_SEED: z.string(),
    ATTESTATION_TABLE_ID: z.string(),
  },
  client: {
    NEXT_PUBLIC_PROJECT_ID: z.string(),
    NEXT_PUBLIC_THIRDWEB_ID: z.string(),
  },
  runtimeEnv: {
    ENV_ID: process.env.ENV_ID,
    PRIVATE_DID_SEED: process.env.PRIVATE_DID_SEED,
    CONTEXT_ID: process.env.CONTEXT_ID,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_THIRDWEB_ID: process.env.NEXT_PUBLIC_THIRDWEB_ID,
    ATTESTATION_TABLE_ID: process.env.ATTESTATION_TABLE_ID,
  },
});
