/**
 * Property of Qodev
 * Split css string to an css object. please take note pre.
 * @param input example "font-style:italic;font-size: 40px;"
 * @returns { fontStyle: "italic", fontSize: "40px" }
 */
export function parseInlineStyle(style?: string) {
  if (!style) return {};
  const template = document.createElement("template");
  template.setAttribute("style", style);
  return Object.entries(template.style)
    .filter(([key]) => !/^[0-9]+$/.test(key))
    .filter(([, value]) => Boolean(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
