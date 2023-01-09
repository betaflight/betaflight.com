import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { CloudArrowUpIcon, FolderIcon } from '@heroicons/react/24/solid';

import LandingPageFeature from '../LandingPageFeature';
import RecentPosts from '../RecentPosts';
import { BlogProps } from '@site/src/types';

type IconElementFeatureProps = {
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
  title: string;
  children: React.ReactNode;
}

function IconElementFeature({ Icon, title, children }: IconElementFeatureProps): JSX.Element {
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

function HomepageHeader({ recentPosts }: BlogProps): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <div className='text-black p-6'>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <div className="container flex justify-center">
          <div>
            <div className='flex items-center justify-center'>
              <img src={require('@site/static/img/logo_fb.png').default} className="min-w-[200px]"></img>
              <p className="text-primary-500 text-5xl font-bold uppercase">{siteConfig.tagline}</p>
            </div>
            <div className="flex justify-center mt-4">
              <p className={clsx('hero__subtitle', '')}>Betaflight is flight controller software (firmware) used to fly multi-rotor craft and fixed wing craft. This fork differs from Baseflight and Cleanflight in that it focuses on flight performance, leading-edge feature additions, and wide target support.</p>
            </div>
          </div>
        </div>
        <RecentPosts recentPosts={recentPosts}></RecentPosts>
      </div>
    </div>
  );
}

export default function Home({ recentPosts }: BlogProps): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`FlyFast - ${siteConfig.title}`}
      description="Are you ready to fly?"
    >
      <main className="m-4 flex flex-col space-y-4">
        <div
          className="rounded-2xl bg-white bg-no-repeat bg-cover bg-bottom h-[900px]"
          style={{
            backgroundImage: "url(" + require('@site/static/img/header-bg.jpg').default + ")"
          }}
        >
          <HomepageHeader recentPosts={recentPosts} />
        </div>
        <LandingPageFeature title="About" className="bg-primary-500/80 text-white">
          <div>
            about
          </div>
        </LandingPageFeature>
        <LandingPageFeature title="Getting started" className="bg-black/20 text-primary-500">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <IconElementFeature title="Installation & Documentation" Icon={CloudArrowUpIcon}>
                  <div className="text-white">
                    <a className="underline" href='/docs'>See the Betaflight wiki</a>
                  </div>
                </IconElementFeature>
              </div>
              <div>
                <IconElementFeature title="Betaflight Releases" Icon={FolderIcon}>
                  <div className="text-white">
                    Releases can be found by following the link below or downloaded from within the firmware section within the Betaflight Configurator. Also check the Upgrading List to the Right for Release Notes and other Details on the various Versions.
                  </div>
                </IconElementFeature>
              </div>
            </div>
          </div>
        </LandingPageFeature>
      </main>
    </Layout>
  );
}
