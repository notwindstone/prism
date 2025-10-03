import { defineConfig, presetIcons, presetWind3 } from "unocss";

export default defineConfig({
  "theme": {
    "colors": {
      "catppuccin": {
        "950": "#09090e",
        "925": "#0c0c14",
        "900": "#11111b",
        "800": "#181825",
        "700": "#1e1e2e",
        "600": "#313244",
        "500": "#45475a",
        "400": "#585b70",
        "300": "#6c7086",
        "200": "#7f849c",
        "100": "#9399b2",
        "50" : "#a6adc8",
      },
    },
    "breakpoints": {
      "sm" : "640px",
      "md" : "768px",
      "lg" : "1024px",
      "xl" : "1280px",
      // 'xle' - xl extra, extracts firefox's scrollbar width (well, maybe firefox's)
      "xle": "1316px",
      "2xl": "1536px",
    },
  },
  "presets": [

    /*
     * 'presetWind4' requires Chrome 111+ (March 9, 2023)
     * Otherwise colors won't work, so not worth it
     */
    presetWind3({
      // Apply dark theme only if there is a 'dark' class on parent elements
      "dark": "class",
    }),
    // Lucide icons available by class names (@iconify-json/lucide)
    presetIcons(),
  ],
});