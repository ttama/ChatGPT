document.addEventListener("DOMContentLoaded", function () {
    kuromoji.builder({ dicPath: "./dict" }).build(function (err, tokenizer) {
      if (err) {
        console.error(err);
      } else {
        window.tokenizer = tokenizer;
      }
    });
  });
  
  function search() {
    const searchInput = document.getElementById("searchInput").value;
    const results = document.getElementById("results");
    results.innerHTML = "";
  
    const tokens = window.tokenizer.tokenize(searchInput);
    const keywords = tokens
      .filter(token => token.pos === "名詞" && token.surface_form !== "LocalBase")
      .map(token => token.surface_form);
  
    const matchedItems = new Set();
    for (const keyword of keywords) {
      for (const info of preparationList) {
        if (info.includes(keyword)) {
          matchedItems.add(info);
        }
      }
    }
  
    for (const item of matchedItems) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      results.appendChild(listItem);
    }
  }
  