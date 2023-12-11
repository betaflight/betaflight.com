// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const math = require('remark-math')
const katex = require('rehype-katex')

require('dotenv').config()

const sortDescending = ['release']

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Betaflight',
  tagline: 'Pushing the Limits of UAV Performance',
  url: process.env.URL,
  baseUrl: process.env.BASE_PATH,
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/betaflight/icon_light.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.ORG, // Usually your GitHub org/user name.
  projectName: 'betaflight.com', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      './plugins/blog-plugin',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: 'blog',
        routeBasePath: 'blog',
        path: './blog',
        feedOptions: {
          type: 'all',
          title: 'Betaflight News',
          language: 'en',
          copyright: `Copyright © ${new Date().getFullYear()} All rights reserved BetaFlight Team`,
        },
      }),
    ],
    'docusaurus-plugin-sass',
    require.resolve('docusaurus-lunr-search'),
    async function tailwind(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',*/
          remarkPlugins: [math],
          rehypePlugins: [katex],
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            const mustReverse = sortDescending.includes(args.item.dirName)
            return mustReverse ? sidebarItems.reverse() : sidebarItems
          },
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/tailwind.scss'), require.resolve('./src/css/mermaid.scss'), require.resolve('./src/css/custom.css')],
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Betaflight',
        logo: {
          alt: 'Betaflight Logo',
          src: 'img/betaflight/icon_light.svg',
          srcDark: 'img/betaflight/icon_dark.svg',
        },
        items: [
          //   {
          //     type: 'doc',
          //     docId: 'wiki',
          //     position: 'left',
          //     label: 'Wiki',
          //   },
          {
            type: 'docSidebar',
            sidebarId: 'wiki',
            position: 'left',
            label: 'Wiki',
          },
          {
            type: 'docSidebar',
            sidebarId: 'development',
            position: 'left',
            label: 'Development',
          },
          {
            type: 'docSidebar',
            sidebarId: 'manufacturer',
            position: 'left',
            label: 'Manufacturer',
          },
          {
            type: 'docSidebar',
            sidebarId: 'release',
            position: 'left',
            label: 'Release',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tuning',
            position: 'left',
            label: 'Tuning',
          },
          {
            to: '/download',
            label: 'Download',
            position: 'left',
          },
          {
            to: '/stats',
            label: 'Stats',
            position: 'left',
          },
          {
            to: '/partner',
            label: 'Partner',
            position: 'left',
          },
          {
            to: '/sponsors',
            label: 'Sponsors',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/betaflight/betaflight',
            label: 'GitHub',
            position: 'right',
          },
          {
            label: 'Feeds',
            position: 'right',
            items: [
              {
                label: 'RSS',
                target: '_blank',
                href: '/blog/rss.xml',
              },
              {
                label: 'Atom',
                target: '_blank',
                href: '/blog/atom.xml',
              },
              {
                label: 'Json',
                target: '_blank',
                href: '/blog/feed.json',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          src: 'img/betaflight/icon_dark.svg',
        },
        links: [
          {
            title: 'Youtube',
            items: [
              {
                label: 'Joshua Bardwell',
                href: 'https://www.youtube.com/channel/UCX3eufnI7A2I7IkKHZn8KSQ',
                icon: 'youtube',
              },
              {
                label: 'Ivan Efimov',
                href: 'https://www.youtube.com/channel/UCQtdpSBYlsWH6_m1Us_d8dg',
                icon: 'youtube',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Oscar Liang',
                href: 'https://oscarliang.com/',
                icon: 'site',
              },
              {
                label: 'VitroidFPV',
                href: 'https://www.vitroidfpv.com/',
                icon: 'site',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.betaflight.com/invite',
                icon: 'discord',
              },
              {
                label: 'IntoFPV',
                href: 'https://intofpv.com/',
                icon: 'forum',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
                icon: 'blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/betaflight/betaflight',
                icon: 'github',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} All rights reserved Team Betaflight`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
