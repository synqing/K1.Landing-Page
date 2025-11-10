/** @type {import('next').NextConfig} */
const isCI = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
const basePath = isCI && repo ? `/${repo}` : ''

const nextConfig = {
  // SSR mode (API routes enabled). For static hosting, re-enable `output: 'export'`.
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
}

module.exports = nextConfig
