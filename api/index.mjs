import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import worker from "../dist/server/index.js";

const clientRoot = join(process.cwd(), "dist", "client");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveAssetPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  return join(clientRoot, safePath);
}

async function fetchAsset(request) {
  const url = new URL(request.url);
  const assetPath = resolveAssetPath(url.pathname);

  if (!assetPath.startsWith(clientRoot)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const fileStat = await stat(assetPath);

    if (!fileStat.isFile()) {
      return new Response("Not found", { status: 404 });
    }

    const stream = Readable.toWeb(createReadStream(assetPath));
    const headers = new Headers({
      "content-length": String(fileStat.size),
      "content-type": contentTypes[extname(assetPath).toLowerCase()] ?? "application/octet-stream",
    });

    return new Response(stream, { headers });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function handleWebRequest(request) {
  return worker.fetch(request, {
    ASSETS: { fetch: fetchAsset },
  }, {
    waitUntil() {},
    passThroughOnException() {},
  });
}

function createRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `${protocol}://${host}`);
  const method = req.method ?? "GET";
  const hasBody = !["GET", "HEAD"].includes(method);

  return new Request(url, {
    method,
    headers: req.headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function writeResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  await pipeline(Readable.fromWeb(response.body), res);
}

export default async function handler(req, res) {
  try {
    const response = await handleWebRequest(createRequest(req));
    await writeResponse(res, response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

export { handleWebRequest };
