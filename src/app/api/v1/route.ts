import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import os from 'os'
import path from "path";

const url: string = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '';

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? url
    : '*';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let title: string = ''
  const downloadPath = path.join(os.homedir(), 'Downloads');

  try {
    await ytdl.getBasicInfo(body.url).then(info => {
      title = info.videoDetails.title
    });
  
    ytdl(body.url).pipe(fs.createWriteStream(`${downloadPath}/${title !== '' ? title : 'video'}.mp4`));
  
    return NextResponse.json({
      status: 200,
      message: "video downloaded",
    },
    {
      headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN }
    }
  );
  } catch (error) {
    console.log(error);
  }
}
