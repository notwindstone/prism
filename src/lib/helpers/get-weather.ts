import type { WebTerm } from "web-term-ui";

export function getWeather({
  command,
  term,
}: {
  "command": string;
  "term"   : WebTerm;
}) {
  const city = command.slice(8).toLowerCase();

  term.pushBelow(`Searching '${city}' on OpenMeteo...`);

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    .then(response => response
      .json()
      .then(data => {
        if (data?.results?.[0] === undefined) {
          term.write(`weather: '${city}' was not found`);
          term.clearBelow();

          return;
        }

        const coords = {
          "latitude" : data?.results?.[0]?.latitude,
          "longitude": data?.results?.[0]?.longitude,
        };

        term.writeBelow(`Getting a weather for '${coords.latitude}, ${coords.longitude}' on OpenMeteo...`);

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,is_day`)
          .then(response => response
            .json()
            .then(data => {
              term.write(`
- day        : ${data?.current?.is_day ? "day" : "night"}
- time       : ${(new Date(data?.current?.time)).toLocaleTimeString()}
- temperature: ${data?.current?.temperature_2m}${data?.current_units?.temperature_2m}
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