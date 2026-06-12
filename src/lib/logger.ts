export function logError(error: unknown, context: string) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error(JSON.stringify({ level: "error", context, message, stack, time: new Date().toISOString() }));
}
