var ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg>`;
var ICON_WRAPPER = `<div fill="gray2" class="sc-bdvvtL eHpQYy sc-iqseJM jZBKhl">${ICON}</div>`;
var BUTTON = `<button type="button" id="download" class="sc-1di2uql-4 gncSRb">${ICON_WRAPPER}</button>`;
var BUTTON_WRAPPER = `<div class="sc-bBHxTw dqWfoC"><div>${BUTTON}</div></div>`;

(() => {
  const path_split = window.location.pathname.split("/").slice(1);
  const page_type =
    path_split[0] == "home" || path_split[0] == "posts"
      ? path_split[0]
      : "author";
  const author =
    page_type == "author"
      ? document.querySelector("h1.sc-eCImPb.eVKKik").textContent
      : page_type == "posts"
      ? document.querySelector("div.sc-jrQzAO.bNOEps").textContent
      : null;

  setInterval(() => insert_buttons(author), 1000);
})();

function insert_buttons(author) {
  console.log(author);
  Array.from(document.querySelectorAll('div[data-tag="post-card"]')).map(
    (post_card) => insert_button(post_card, author)
  );
}

function insert_button(post_card, author) {
  if (!post_card.querySelector("audio")) return;

  let download_button = post_card.querySelector("button#download");
  const actions_div = post_card.querySelector("div.sc-fKVqWL.iSyrRk");

  if (!download_button) {
    const audio_data = get_audio_data(post_card, author);

    download_button = html_to_element(BUTTON_WRAPPER);
    actions_div.appendChild(download_button);
    download_button.addEventListener("click", () => download_audio(audio_data));
  }
}

function get_audio_data(post_card, author) {
  return {
    url: post_card.querySelector("audio").src,
    title: post_card.querySelector('span[data-tag="post-title"]').textContent,
    author:
      author ||
      post_card.querySelector('a[href^="https://www.patreon.com/"]')
        .textContent,
  };
}

function html_to_element(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

function download_audio({ url, title, author }) {
  browser.runtime.sendMessage({ url, title, author }).catch(console.error);
}
