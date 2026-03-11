import { NavbarOptions, defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from '@vuepress/cli'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { viteBundler } from '@vuepress/bundler-vite'
import { path } from '@vuepress/utils'
import { SidebarOptions } from '@vuepress/theme-default'

const sidebar: SidebarOptions = [
  { text: 'Introduction', link: '/introduction' },
  {
    text: 'Documents',
    prefix: 'documents',
    children: [
      '/documents/getting-started',
      '/documents/configuration',
      '/documents/benchmarks'
    ]
  },
  {
    text: 'Archives',
    prefix: 'archives',
    children: [
      '/archives/v7.0.0-incubating',
      '/archives/v6.0.0-incubating',
      '/archives/v5.0.0',
      '/archives/v4.0.1',
      '/archives/v4.0.0',
      '/archives/all-releases',
    ]
  },
];

const navbar: NavbarOptions = [
  { text: 'Introduction', link: '/introduction' },
  { text: 'Documentations', children: [
    { text: 'Getting Started', link: '/documents/getting-started' },
    { text: 'Configuration', link: '/documents/configuration' },
    { text: 'Benchmarks', link: '/documents/benchmarks' },
  ]},
  { text: 'Archives', children: [
    { text: 'v7.0.0-incubating', link: '/archives/v7.0.0-incubating' },
    { text: 'v6.0.0-incubating', link: '/archives/v6.0.0-incubating' },
    { text: 'v5.0.0', link: '/archives/v5.0.0' },
    { text: 'v4.0.1', link: '/archives/v4.0.1' },
    { text: 'v4.0.0', link: '/archives/v4.0.0' },
    { text: 'All Archived Releases', link: '/archives/all-releases' },
  ]},
  {
    text: 'ASF',
    children: [
      { text: 'License', link: 'https://www.apache.org/licenses/', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Security', link: 'https://www.apache.org/security/', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Privacy', link: 'https://privacy.apache.org/policies/privacy-policy-public.html', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Thanks', link: 'https://www.apache.org/foundation/thanks.html', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Sponsorship', link: 'https://www.apache.org/foundation/sponsorship.html', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Events', link: 'https://events.apache.org/', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Foundation', link: 'https://www.apache.org/', target: '_blank', rel: 'noopener noreferrer' },
    ],
  },
];

export default defineUserConfig({
  base: '/',
  theme: defaultTheme({
    logo: '/auron.svg',
    home: '/',
    colorMode: 'light',
    colorModeSwitch: false,
    repo: 'apache/auron',
    sidebarDepth: 1,
    lastUpdated: false,
    contributors: false,
    editLink: false,
    sidebar,
    navbar,
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  bundler: viteBundler(),
})
