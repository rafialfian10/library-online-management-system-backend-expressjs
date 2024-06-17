exports.photoUrlGenerator = (req, fileName) => {
  if (req.hostname === "localhost" || req.host === "127.0.0.1") {
    return `${req.protocol}://${req.get("host")}/static/photo/${fileName}`;
  } else {
    return `${req.protocol}://${req.get("host")}/static/photo/${fileName}`;
    // return `https://${req.hostname}/static/photo/${fileName}`;
  }
};

exports.imageUrlGenerator = (req, fileName) => {
  if (req.hostname === "localhost" || req.host === "127.0.0.1") {
    return `${req.protocol}://${req.get("host")}/static/book/image/${fileName}`;
  } else {
    return `${req.protocol}://${req.get("host")}/static/book/image/${fileName}`;
    // return `https://${req.hostname}/static/book/image/${fileName}`;
  }
};

exports.fileUrlGenerator = (req, fileName) => {
  if (req.hostname === "localhost" || req.host === "127.0.0.1") {
    return `${req.protocol}://${req.get("host")}/static/book/file/${fileName}`;
  } else {
    return `${req.protocol}://${req.get("host")}/static/book/file/${fileName}`;
    // return `https://${req.hostname}/static/book/file/${fileName}`;
  }
};
