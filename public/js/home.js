$(document).ready(() => {
  $.get("/api/posts", (results) => {
    outputPosts(results, $(".postsContainer"));
  });
});

function outputPosts(results, container) {
  container.html("");
  results.forEach((e) => {
    const html = createPostHtml(e);
    container.append(html);
  });

  if (results.length == 0) {
    container.append("<span class='noResults'>Nothing to show</span>");
  }
}
