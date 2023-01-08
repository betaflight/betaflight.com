import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { CloudArrowUpIcon, FolderIcon } from '@heroicons/react/24/solid';

import LandingPageFeature from '../components/LandingPageFeature';

import styles from './index.module.css';

const recent: {
  title: string;
  items: {
    title: string;
    permalink: string;
  }[];
} = require('@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json')

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

function AboutFeature({ Icon, title, children }: Props) {
  return (
    <div className="flex">
      <Icon className="h-[50px] w-[50px] min-w-[50px] min-h-[50px]"></Icon>
      <div className="ml-2">
        <div className="text-lg font-bold">{ title }</div>
        {children}
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary m-4 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] shadow-primary-200', styles.heroBanner)}>
      <div className="container">
        <p className="hero__title">{siteConfig.tagline}</p>
        <div className="flex justify-center mt-4">
          <p className={clsx('hero__subtitle', 'max-w-[500px]')}>Betaflight is flight controller software (firmware) used to fly multi-rotor craft and fixed wing craft. This fork differs from Baseflight and Cleanflight in that it focuses on flight performance, leading-edge feature additions, and wide target support.</p>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const lastThree = recent.items.slice(0, 3);

  return (
    <Layout
      title={`FlyFast - ${siteConfig.title}`}
      description="Are you ready to fly?"

    >
      <HomepageHeader />
      <main className="m-4 flex flex-col space-y-4">
        <div
          className="rounded-2xl bg-white bg-no-repeat bg-cover bg-bottom h-[700px]"
          style={{
            backgroundImage: "url(" + require('@site/static/img/header-bg.jpg').default + ")"
          }}
        >
        </div>
        <LandingPageFeature title={recent.title} className="bg-black/20 text-primary-500">
          <div className="flex space-x-10 justify-between text-white/80">
            {lastThree.map((post) => <a href={post.permalink}>{post.title}</a>)}
          </div>
        </LandingPageFeature>
        <LandingPageFeature title="About" className="bg-primary-500/10 text-white">
          <div>
            about
          </div>
        </LandingPageFeature>
        <LandingPageFeature title="Getting started" className="bg-black/20 text-primary-500">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <AboutFeature title="Installation & Documentation" Icon={CloudArrowUpIcon}>
                  <div className="text-white">
                    <a className="underline" href='/docs'>See the Betaflight wiki</a>
                  </div>
                </AboutFeature>
              </div>
              <div>
                <AboutFeature title="Betaflight Releases" Icon={FolderIcon}>
                  <div className="text-white">
                    Releases can be found by following the link below or downloaded from within the firmware section within the Betaflight Configurator. Also check the Upgrading List to the Right for Release Notes and other Details on the various Versions.
                  </div>
                </AboutFeature>
              </div>
            </div>
          </div>
        </LandingPageFeature>
      </main>
    </Layout>
  );
}
