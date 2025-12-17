// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import remarkMentions from 'remark-mentions';
import rehypeKatex from 'rehype-katex';
import dotenv from 'dotenv';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

dotenv.config();

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const sortDescending = new Set(['release']);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Betaflight',
  tagline: 'Pushing the limits of UAV performance',
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

  scripts: [
    {
      src: 'https://cdn.telemetrydeck.com/websdk/telemetrydeck.min.js',
      'data-app-id': 'CDC108A1-CA11-4111-B086-0474C07C3D0F',
      async: false,
    },
  ],

  plugins: [
    [
      './plugins/blog-plugin',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: 'blog',
        routeBasePath: 'blog',
        path: './blog',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
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
    async function tailwind() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(tailwindcss, autoprefixer);
          return postcssOptions;
        },
      };
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
          remarkPlugins: [
            remarkMath,
            [
              remarkMentions,
              {
                usernameLink: (username) => `https://github.com/${username}`,
              },
            ],
          ],
          rehypePlugins: [rehypeKatex],
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            const dirName = args?.item?.dirName;
            const mustReverse = dirName && sortDescending.has(dirName);
            return mustReverse ? sidebarItems.reverse() : sidebarItems;
          },
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/mermaid.scss'), require.resolve('./src/css/custom.css'), require.resolve('./src/css/tailwind.scss')],
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
            to: '/download',
            label: 'Download',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sponsors',
            position: 'left',
            label: 'Sponsors',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right',
          },
          {
            label: 'Apps',
            position: 'right',
            items: [
              {
                label: 'Blackbox Explorer',
                href: 'https://blackbox.betaflight.com',
              },
              {
                label: 'Betaflight App',
                href: 'https://app.betaflight.com/',
              },
            ],
          },
          {
            href: 'https://github.com/betaflight/betaflight',
            label: 'GitHub',
            position: 'right',
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
            title: 'Feeds',
            items: [
              {
                label: 'RSS',
                href: '/blog/rss.xml',
                icon: 'blog',
                target: '_blank',
              },
              {
                label: 'Atom',
                href: '/blog/atom.xml',
                icon: 'blog',
                target: '_blank',
              },
              {
                label: 'JSON',
                href: '/blog/feed.json',
                icon: 'blog',
                target: '_blank',
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

  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      ssgWorkerThreads: true,
    },
  },
};

export default config;
