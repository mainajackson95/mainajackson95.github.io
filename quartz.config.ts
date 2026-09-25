import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration — kaisec's Bug Bounty Playbook
 *
 * Theme mirrored from bugbounty.info (Quartz v4.5.2) — parchment/gold palette.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "BugBounty.info",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: null,
    },
    locale: "en-US",
    baseUrl: "mainajackson95.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf6f0",
          lightgray: "#ede6db",
          gray: "#b8a99a",
          darkgray: "#3d3529",
          dark: "#1a1510",
          secondary: "#b8860b",
          tertiary: "sienna",
          highlight: "rgba(184, 134, 11, 0.10)",
          textHighlight: "#b8860b33",
        },
        darkMode: {
          light: "#1a1a2e",
          lightgray: "#252547",
          gray: "#4a4f6c",
          darkgray: "#d4d4dc",
          dark: "#f0e6d3",
          secondary: "#e2b340",
          tertiary: "#c06c44",
          highlight: "rgba(226, 179, 64, 0.12)",
          textHighlight: "#e2b34040",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
