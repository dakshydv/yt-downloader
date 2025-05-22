import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import os from 'os'
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let title: string = ''
  const downloadPath = path.join(os.homedir(), 'Downloads');

  await ytdl.getBasicInfo(body.url).then(info => {
    title = info.videoDetails.title
  });

  ytdl(body.url).pipe(fs.createWriteStream(`${downloadPath}/${title !== '' ? title : 'video'}.mp4`));

  return NextResponse.json({
    message: "video downloaded",
  });
}
