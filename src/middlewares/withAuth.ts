import { updateSession } from "@/utils/supabase/middleware";
import { CustomMiddleware } from "@/lib/middleware/chain";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function withAuth(middleware: CustomMiddleware): CustomMiddleware {
  return async (req: NextRequest, event: NextFetchEvent, res: NextResponse) => {
    const response = await updateSession(req);
    return middleware(req, event, response);
  };
}
