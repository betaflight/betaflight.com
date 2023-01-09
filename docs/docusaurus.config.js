// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Betaflight',
  tagline: 'Are you ready to fly?',
  url: 'https://freasy.github.io',
  baseUrl: '/betaflight.com/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/logo_fb.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'freasy', // Usually your GitHub org/user name.
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
	  mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      "./plugins/blog-plugin",
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        feedOptions: {
          type: 'all',
          title: 'Betaflight News',
          language: 'en',
          copyright: `Copyright © ${new Date().getFullYear()} All rights reserved Team Betaflight - Built with Docusaurus.`,
        }
      })
    ],
    'docusaurus-plugin-sass',
    require.resolve('docusaurus-lunr-search'),
    async function tailwind(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
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
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/tailwind.scss'),
            require.resolve('./src/css/mermaid.scss'),
            require.resolve('./src/css/custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Betaflight',
        logo: {
          alt: 'Betaflight Logo',
          src: 'img/logo_fb.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'misc/mdx-reference',
            position: 'left',
            label: 'Wiki',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/betaflight/betaflight',
            label: 'GitHub',
            position: 'right',
          },
          {
            label: 'Feeds',
            position: 'right',
            items: [{
              label: 'RSS',
              target: '_blank',
              href: '/blog/rss.xml'
            },{
              label: 'Atom',
              target: '_blank',
              href: '/blog/atom.xml'
            },{
              label: 'Json',
              target: '_blank',
              href: '/blog/feed.json'
            }]
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.betaflight.com/invite',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/betaflight/betaflight',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} All rights reserved Team Betaflight - Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
