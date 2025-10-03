export function getPlatformName(platform?: string): "macOS" | "Windows" | "Linux" {
  const toCheck = (platform ?? "").toLowerCase();

  switch (true) {
    case toCheck.includes("darwin"):
    case toCheck.includes("iphone"):
    case toCheck.includes("ipad"):
    case toCheck.includes("ios"):
    case toCheck.includes("mac"): {
      return "macOS";
    }
    case toCheck.includes("windows"): {
      return "Windows";
    }
    default: {
      return "Linux";
    }
  }
}