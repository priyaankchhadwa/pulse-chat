import { PrismaClient } from "@prisma/client/extension";
import { exportTraceState } from "next/dist/trace";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;