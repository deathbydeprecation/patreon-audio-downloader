browser.runtime.onMessage.addListener(async (request) => {
  const url = request.url;
  const title = request.title
    .replace(/[^a-z0-9-.'!]/gi, "_")
    .replace(/_+/g, "_");
  const filename = `${title} - u-${request.author}.m4a`;

  browser.downloads
    .download({
      url,
      filename,
    })
    .catch(console.error);
});
