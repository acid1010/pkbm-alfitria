export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

export async function runWhenDatabaseReady<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured) {
    return fallback;
  }

  return query();
}
