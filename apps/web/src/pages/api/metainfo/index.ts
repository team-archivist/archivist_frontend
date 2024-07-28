import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.json({});
    return;
  }

  const { linkUrl } = req.body;

  const { data } = await axios.get(linkUrl);

  const $ = cheerio.load(data);

  const linkData: { title: string; ogDescription: string; ogImage: string } = {
    title: "",
    ogDescription: "",
    ogImage: "",
  };

  $("meta").each((index, element) => {
    const name = $(element).attr("name") || $(element).attr("property") || "";
    const content = $(element).attr("content") || "";

    if (name === "og:title") {
      linkData.title = content;
    }
    if (name === "twitter:title" && !linkData.title) {
      linkData.title = content;
    }

    if (name === "og:description") {
      linkData.ogDescription = content;
    }
    if (name === "twitter:description" && !linkData.ogDescription) {
      linkData.ogDescription = content;
    }

    if (name === "og:image") {
      linkData.ogImage = content;
    }
    if (name === "twitter:image" && !linkData.ogImage) {
      linkData.ogImage = content;
    }
  });

  if (!linkData.title) {
    linkData.title = $("title").text();
  }

  if (!linkData.ogDescription) {
    linkData.ogDescription =
      $("meta[name='description']").attr("content") || "";
  }

  if (!linkData.title || !linkData.ogDescription || !linkData.ogImage) {
    const predictedIframe = $("iframe").first();
    const src = predictedIframe.attr("src");
    const origin = req.headers.origin || "";
    if (origin && src) {
      const url = new URL(linkUrl);
      const srcUrl = new URL(src, url.origin);
      const recursiveCallUrl = `${origin}/api/metainfo`;
      const { data } = await axios.post(recursiveCallUrl, { linkUrl: srcUrl });
      return res.json(data);
    }
  }

  res.json(linkData);
}
