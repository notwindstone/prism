const getBatteryStatus = (battery: number) => `battery ${battery * 100}%`;

export function pfetch({
  platform,
  browser,
  engine,
  battery,
}: {
  "platform": string;
  "browser" : string;
  "engine"  : string;
  "battery"?: number;
}): string {
  return "" +
    "\n" + String.raw`      /\        ame@chan` +
    "\n" + String.raw`    //  \\      os      ${platform}` +
    "\n" + String.raw`   //    \ \    browser ${browser}` +
    "\n" + String.raw` / /     _) )   engine  ${engine}` +
    "\n" + String.raw`/_/___-- __-    cpu     ${navigator?.hardwareConcurrency ?? 0} threads` +
    "\n" + String.raw` /____--        ascii   endeavour os` +
    "\n" + String.raw`                de      plasma 6.4` +
    "\n" + String.raw`                ${battery ? getBatteryStatus(battery) : ""}`;
}