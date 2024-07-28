import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.json({});
    return;
  }

  const { src } = req.body;

  const { data, headers } = await axios.get(src, {
    responseType: "arraybuffer",
  });
  const contentType = headers["content-type"];

  const blob = Buffer.from(data, "binary").toString("base64");
  const blobString = `data:${contentType};base64,${blob}`;
  return res.json({ blob: blobString, contentType });
}
