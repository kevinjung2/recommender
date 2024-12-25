import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

import type { VercelPgClient } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql as VercelPgClient, { schema });
