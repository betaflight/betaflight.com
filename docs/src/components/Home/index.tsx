import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { CloudArrowDownIcon, CloudArrowUpIcon, Cog6ToothIcon, Cog8ToothIcon, DocumentTextIcon, ExclamationCircleIcon, FolderIcon, LinkIcon, PresentationChartLineIcon } from '@heroicons/react/24/solid';

import LandingPageFeature from '../LandingPageFeature';
import RecentPosts from '../RecentPosts';
import { BlogProps } from '@site/src/types';
import slugify from 'react-slugify';

type IconElementFeatureProps = {
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
  title: string;
  description?: string;
  link?: {
    text: string;
    href: string;
    icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  }
  children: React.ReactNode;
}

function IconElementFeature({ Icon, title, description, link, children }: IconElementFeatureProps): JSX.Element {
  return (
    <div className="flex">
      <Icon className="h-[50px] w-[50px] min-w-[50px] min-h-[50px]"></Icon>
      <div className="ml-2">
        <div className="text-lg font-bold mb-2">{ title }</div>
        { description && <div className="text-gray-400 mb-2">{ description }</div> }
        { link &&
          <a className="underline text-blue-400 flex items-center" href={link.href}>
            { link.icon && <link.icon className="h-4 w-4 mr-2"></link.icon> }
            { link.text }
          </a>
        }
        { children }
      </div>
    </div>
  );
}

function HomepageHeader({ recentPosts }: BlogProps): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <div className='text-black p-6'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
        <div className="flex justify-center">
          <div>
            <div className='flex flex-col items-center justify-center'>
              <img src={require('@site/static/img/logo_fb.png').default} className="min-w-[200px]"></img>
              <p className="text-primary-500 text-5xl font-bold uppercase">{siteConfig.tagline}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className='text-3xl'>Betaflight is flight controller software (firmware) used to fly multi-rotor craft and fixed wing craft. This fork differs from Baseflight and Cleanflight in that it focuses on flight performance, leading-edge feature additions, and wide target support.</div>
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

  const anchorsList = [
    'About',
    'Getting started',
  ].map((title) => [slugify(title), title]);

  console.log(anchorsList);

  return (
    <Layout
      title={`FlyFast - ${siteConfig.title}`}
      description="Are you ready to fly?"
    >
      <main className="m-4 flex flex-col space-y-4">
        <div
          className="rounded-2xl bg-white bg-no-repeat bg-cover bg-bottom h-[1500px] lg:h-[1000px]"
          style={{
            backgroundImage: "url(" + require('@site/static/img/header-bg.jpg').default + ")"
          }}
        >
          <HomepageHeader recentPosts={recentPosts} />

          <div className='w-full flex justify-center text-primary-500 underline uppercase font-bold text-xl'>
            <div className='flex space-x-4'>
              { anchorsList.map(([slug, title]) => (
                  <div key={slug}>
                    <a href={'#' + slug}>{title}</a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <LandingPageFeature title="About" className="bg-primary-500/80 text-white">
          <div>
            about
          </div>
        </LandingPageFeature>
        <LandingPageFeature title="Getting started" className="bg-black/40 shadow-[0_0_30px_-10px] shadow-primary-500 text-primary-500">
          <>
            <div className='text-xl text-center text-gray-500 mb-4'>So what do you need to know?</div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-x-4">
                <div className='flex flex-col space-y-4'>
                  <IconElementFeature
                    title="Installation & Documentation"
                    link={{ text: 'See the Betaflight Wiki', href: '/docs'}}
                    Icon={DocumentTextIcon}
                  >
                  </IconElementFeature>
                  <IconElementFeature
                    title="Configuration Tool"
                    link={{ text: 'Latest configurator releases', href: 'https://github.com/betaflight/betaflight-configurator/releases/latest'}}
                    description='To configure Betaflight you should use the Betaflight-configurator GUI tool (Windows/OSX/Linux) which can be found here:'
                    Icon={Cog6ToothIcon}
                  >
                  </IconElementFeature>
                  <IconElementFeature
                    title='TX Lua Scripts'
                    Icon={Cog8ToothIcon}
                    description='Configure Betaflight from your radio with the Betaflight TX Lua Scripts:'
                    link={{
                      text: 'Latest lua scripts releases',
                      href: 'https://github.com/betaflight/betaflight-tx-lua-scripts/releases/latest'
                    }}
                  >
                  </IconElementFeature>
                  <IconElementFeature
                    title='BlackBox Viewer'
                    Icon={PresentationChartLineIcon}
                  >
                    <div className='flex flex-col'>
                      <div className='text-gray-400 flex flex-row space-x-1 mt-2'>
                        <span>Viewer Releases are:</span>
                        <a href='https://github.com/betaflight/blackbox-log-viewer/releases' className='text-blue-400 underline'>Latest viewer releases</a>
                      </div>
                      <div className='text-gray-400 flex flex-row space-x-1 mt-2'>
                        <span>The Latest Viewer source is:</span>
                        <a href='https://github.com/betaflight/blackbox-log-viewer' className='text-blue-400 underline'>Latest viewer source</a>
                      </div>
                      <div className='text-gray-400 flex flex-col mt-2'>
                        See BB Logging and Usage Wiki page on using the BlackBox logger.
                      </div>
                    </div>
                  </IconElementFeature>
                </div>
                <div className='flex flex-col space-y-4'>
                  <IconElementFeature
                    title="Betaflight Releases"
                    link={{ text: 'Releases', href: 'https://github.com/betaflight/betaflight/releases'}}
                    description='Releases can be found by following the link below or downloaded from within the firmware section within the Betaflight Configurator. Also check the Upgrading List to the Right for Release Notes and other Details on the various Versions.'
                    Icon={FolderIcon}
                  >
                  </IconElementFeature>
                  <IconElementFeature
                    title='BETA TESTING (WARNING)'
                    Icon={ExclamationCircleIcon}
                    description='If you want to contribute to better development you can download the latest beta build directly from:'
                  >
                    <div className='flex flex-col'>
                      <a href='https://ci.betaflight.tech/job/Betaflight/lastBuild/artifact/obj/' className='text-blue-400 underline'>Nightly builds</a>
                      <a href='https://github.com/betaflight/betaflight-configurator-nightlies/releases' className='text-blue-400 underline'>Betaflight Configurator Nightly builds</a>
                      <a href='https://github.com/betaflight/betaflight-tx-lua-scripts-nightlies/releases' className='text-blue-400 underline'>Betaflight TX Lua Scripts Nightly builds</a>
                      <a href='https://github.com/betaflight/blackbox-log-viewer-nightlies/releases' className='text-blue-400 underline'>Blackbox Viewer Nightly builds</a>
                      <div className='text-gray-400 flex flex-col mt-2'>
                        You can find release planning here:
                        <a href='https://github.com/betaflight/betaflight/milestones' className='text-blue-400 underline'>Release planning</a>
                      </div>
                    </div>
                  </IconElementFeature>
                </div>
              </div>
            </div>
          </>
        </LandingPageFeature>
      </main>
    </Layout>
  );
}
