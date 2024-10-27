import { sendMail } from "@/lib/NodeMailer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {

    sendMail({subject: "Hello", text: "Hello World", to: ""});

    return new NextResponse("eee")
}``