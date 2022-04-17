browser.runtime.onMessage.addListener(async (request) => {
  const url = request.url;
  const title = request.title
    .replace(/[^a-z0-9-.'!]/gi, "_")
    .replace(/_+/g, "_");
  const author = request.author;

  const original_filename = new URL(url).pathname.split("/").slice(-1).pop();
  const file_extension = original_filename.split(".").slice(-1).pop();

  const filename = `${title} - u-${author}.${file_extension}`;

  browser.downloads
    .download({
      url,
      filename,
    })
    .catch(console.error);
});
