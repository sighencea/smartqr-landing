/** @type {import('next').NextConfig} */

// The repository name. Used to build the GitHub Pages base path so that
// assets resolve correctly when served from username.github.io/<repo>.
const repo = "smartqr-landing";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // Emit a fully static site into ./out — required for GitHub Pages.
  output: "export",
  // GitHub Pages cannot run the Next image optimizer.
  images: { unoptimized: true },
  // Serve every route as a directory with an index.html.
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
};

export default nextConfig;
