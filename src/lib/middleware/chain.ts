import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type CustomMiddleware = (
  req: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => Promise<NextResponse> | NextResponse;

export type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware;

export default function chain(
  functions: MiddlewareFactory[] = [],
  index = 0
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (req, event) => NextResponse.next();
}
