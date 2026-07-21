import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { Readable } from "node:stream";
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

export default async function handler(request) {
  return worker.fetch(request, {
    ASSETS: { fetch: fetchAsset },
  }, {
    waitUntil() {},
    passThroughOnException() {},
  });
}
