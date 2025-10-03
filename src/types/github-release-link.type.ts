import { RuntimeDownloadLink } from "@/constants/routes.ts";

export type GithubReleaseLinkType = typeof RuntimeDownloadLink[keyof typeof RuntimeDownloadLink];