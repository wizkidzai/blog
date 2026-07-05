/* Copy for email — clones the post content, inlines computed styles,
   and puts rich HTML on the clipboard so it pastes cleanly into
   Gmail / Outlook / Apple Mail. */
(function () {
  var btn = document.querySelector("[data-copy-email]");
  var hint = document.querySelector("[data-copy-hint]");
  var region = document.querySelector(".post-email-region");
  if (!btn || !region) return;

  // Only inline the properties email clients respect
  var PROPS = [
    "color", "background-color", "font-family", "font-size", "font-weight",
    "font-style", "line-height", "text-align", "text-decoration-line",
    "margin-top", "margin-bottom", "margin-left", "margin-right",
    "padding-top", "padding-bottom", "padding-left", "padding-right",
    "border-left-width", "border-left-style", "border-left-color",
    "border-radius", "letter-spacing"
  ];

  function inlineStyles(src, dst) {
    if (src.nodeType !== 1) return;
    var cs = getComputedStyle(src);
    var out = "";
    for (var i = 0; i < PROPS.length; i++) {
      var v = cs.getPropertyValue(PROPS[i]);
      if (v && v !== "none" && v !== "normal" && v !== "0px") {
        out += PROPS[i] + ":" + v + ";";
      }
    }
    dst.setAttribute("style", out);
    dst.removeAttribute("class");
    var s = src.firstElementChild, d = dst.firstElementChild;
    while (s && d) {
      inlineStyles(s, d);
      s = s.nextElementSibling;
      d = d.nextElementSibling;
    }
  }

  function absolutize(clone) {
    clone.querySelectorAll("a[href]").forEach(function (a) {
      a.setAttribute("href", a.href); // resolves to absolute URL
    });
    clone.querySelectorAll("img[src]").forEach(function (img) {
      img.setAttribute("src", img.src);
      img.setAttribute("width", img.width || "");
      img.style.maxWidth = "100%";
    });
  }

  btn.addEventListener("click", function () {
    var clone = region.cloneNode(true);
    inlineStyles(region, clone);
    absolutize(clone);

    var wrapper = document.createElement("div");
    wrapper.style.cssText = "max-width:632px;font-family:Nunito,'Segoe UI',sans-serif;";
    wrapper.appendChild(clone);
    var html = wrapper.outerHTML;
    var text = region.innerText;

    function done() {
      if (hint) {
        hint.hidden = false;
        setTimeout(function () { hint.hidden = true; }, 4000);
      }
    }

    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" })
        })
      ]).then(done);
    } else {
      // Fallback: select the live region and copy
      var range = document.createRange();
      range.selectNodeContents(region);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      done();
    }
  });
})();
