const axios = require("axios");
const express = require("express");
const jsdom = require("jsdom");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 *
 * 'vc.ru', 'google.com' 같은 'http' protocol 을 포함하고 있는지 여부를 반환합니다
 *
 *
 * @param { string } link - string to process
 *
 * @return { boolean }
 */
const includesProtocol = (link) => {
  return /^(\w+):(\/\/)?/.test(link);
};

/**
 *
 * 'vc.ru', 'google.com' 같은 'http' protocol 을 추가합니다
 *
 *
 * @param { string } link - string to process
 *
 * @return { string }
 */
const addProtocol = (link) => {
  /**  protocol 이 이미 존재하면 진행하지 않습니다 */
  if (includesProtocol(link)) {
    return link;
  }
  /**
   * - 누락된 HTTP 프로토콜은 link 에 추가해야 하지만, 2가지 경우에는 skip 합니다
   *
   *   1) "/general" 같은 내부링크
   *
   *   2) anchor 가 "#results" 일 경우,
   *
   *   3) "//google.com" 과 같은 protocol 관련 URL
   */
  const isInternal = /^\/[^/\s]/.test(link);
  const isAnchor = "#" === link.substring(0, 1);
  const isProtocolRelative = /^\/\/[^/\s]/.test(link);
  if (!isInternal && !isAnchor && !isProtocolRelative) {
    link = "http://" + link;
  }
  return link;
};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  // NOTE: url encode에서 문제 생기면 해당 라인 실행
  // server.use(express.urlencoded({ extended: false }));

  // NOTE: BE를 위한 프록시 세팅 추가
  // server.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: `${process.env.NEXT_PUBLIC_API_URL}/`,
  //     changeOrigin: true,
  //   })
  // );

  server.post("/scrape", async (req, res) => {
    try {
      const linkUrlResponse = await fetch(addProtocol(req.body.linkUrl));
      const domString = await linkUrlResponse.text();
      const parsedDocument = new jsdom.JSDOM(domString).window.document;
      const ogImage = parsedDocument.querySelector(
        "meta[property='og:image']",
      )?.content;
      const ogDescription = parsedDocument.querySelector(
        "meta[property='og:description']",
      )?.content;
      const title = parsedDocument.querySelector("title")?.innerHTML;

      return res.status(200).json({
        ogImage,
        ogDescription,
        title,
      });
    } catch (error) {
      console.error("Error scraping data:", error);
      res.status(400).json({ message: "Scrape failed" });
    }
  });

  server.post("/scrape/image", async (req, res) => {
    try {
      const response = await axios.get(req.body.src, {
        responseType: "arraybuffer", // ArrayBuffer로 응답 받음
      });
      const contentType = response.headers["content-type"];
      const blob = Buffer.from(response.data, "binary").toString("base64");
      const blobString = `data:${contentType};base64,${blob}`;
      return res.status(200).json({ blob: blobString, contentType });
    } catch (error) {
      console.error("Error scraping image:", error);
      res.status(400).json({ message: "Scrape image failed" });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(5220, (err) => {
    if (err) throw err;
    console.log(">>>>>> Ready on http://localhost:5220");
  });
});
