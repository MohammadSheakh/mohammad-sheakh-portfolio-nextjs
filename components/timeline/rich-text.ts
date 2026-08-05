const ALLOWED_TAGS = new Set([
  "B",
  "BLOCKQUOTE",
  "BR",
  "CODE",
  "DIV",
  "EM",
  "FONT",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "I",
  "LI",
  "OL",
  "P",
  "PRE",
  "SPAN",
  "STRONG",
  "U",
  "UL",
]);

export function sanitizeRichText(html: string) {
  if (typeof window === "undefined") return "";

  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  const elements = Array.from(documentFragment.body.querySelectorAll("*"));

  // Strip unsupported elements and attributes before rendering user-authored HTML.
  elements.forEach((element) => {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      return;
    }

    Array.from(element.attributes).forEach((attribute) => {
      const keepMonospaceFace =
        element.tagName === "FONT" &&
        attribute.name === "face" &&
        attribute.value.toLowerCase().includes("mono");
      if (!keepMonospaceFace) element.removeAttribute(attribute.name);
    });
  });

  return documentFragment.body.innerHTML;
}

export function richTextToPlainText(html: string) {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, " ");
  return new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
}
