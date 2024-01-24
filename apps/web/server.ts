const express = require("express");
const jsdom = require("jsdom");
const next = require("next");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  // NOTE: url encode에서 문제 생기면 해당 라인 실행
  // server.use(express.urlencoded({ extended: false }));

  server.post("/scrape", async (req, res) => {
    try {
      const linkUrlResponse = await fetch(req.body.linkUrl);
      const domString = await linkUrlResponse.text();

      const parsedDocument = new jsdom.JSDOM(domString).window.document;

      const ogImage = parsedDocument.querySelector("meta[property='og:image']")
        ?.content;
      const ogDescription = parsedDocument.querySelector(
        "meta[property='og:description']"
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

  server.post("/scrape/image", async (req, res) => {});

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(5220, (err) => {
    if (err) throw err;
    console.log(">>>>>> Ready on http://localhost:5220");
  });
});
