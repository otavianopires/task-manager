import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export async function serverSession(req, res) {
  return await getServerSession(req, res, authOptions)
}
