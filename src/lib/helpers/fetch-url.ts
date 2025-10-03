import type { WebTerm } from "web-term-ui";

export function fetchUrl({
  command,
  term,
}: {
  "command": string;
  "term"   : WebTerm;
}) {
  const url = command.slice(6);
  const t1 = performance.now();

  term.writeBelow(`Fetching ${url}...`);

  if (url.includes(".jpeg") || url.includes(".webp") || url.includes(".jpg") || url.includes(".png")) {
    term.write(`
An image:

<img src="${url}" alt="fetched image">
`);
    term.clearBelow();

    return;
  }

  fetch(url)
    .then(response => response
      .text()
      .then(data => {
        let parsed: unknown;

        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }

        const t2 = performance.now();

        term.write(`
Fetched in ${t2 - t1} ms

${typeof parsed === "object" ? JSON.stringify(parsed, null, 2) : parsed}
`);
        term.clearBelow();
      }))
    .catch(error => {
      term.write(
        "<span class='text-red-500'>error: " +
        error?.message +
        "</span>",
        { "html": true },
      );
      term.clearBelow();
    });
}