import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

const url: string = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "";
const ALLOWED_ORIGIN = url || "*";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const info = await ytdl.getBasicInfo(body.url);
    const title = info.videoDetails.title;

    // Get the video stream
    const stream = ytdl(body.url, {
      quality: "highest",
      filter: "audioandvideo",
    });

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return the video data as a downloadable file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${title}.mp4"`,
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
