import React from 'react';
import clsx from 'clsx';
import AboutHeaderFix from '../icons/about-header.svg';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { CameraIcon, CodeBracketIcon, Cog6ToothIcon, Cog8ToothIcon,
  CpuChipIcon, DocumentTextIcon, ExclamationCircleIcon, FolderIcon,
  PresentationChartLineIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';

import LandingPageFeature from '../components/LandingPageFeature';
import RecentPosts from '../components/RecentPosts';
import { BlogProps } from '@site/src/types';
import JetIcon from '@site/src/icons/jet.icon.svg';
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

function AboutCard({ title, Icon, className, children }: { title: string; className: string; Icon: React.ComponentType<React.ComponentProps<'svg'>>; children: React.ReactNode; }): JSX.Element {
	return (
		<div className="box flex flex-col w-full shadow-xl">
			<div
				className={clsx(className, `relative flex text-2xl w-fit font-semibold items-center bg-neutral-500/10 py-2 px-4 rounded-t-xl`)}
			>

				<Icon className="w-8 h-8 mr-2" />
				{title}
				<AboutHeaderFix className='absolute right-[-32px] bottom-0 text-neutral-500/10'></AboutHeaderFix>
			</div>
			<div className="w-full h-full bg-neutral-500/10 p-4 rounded-b-xl rounded-r-xl text-gray-200 text-base">{children}</div>
		</div>
	);
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  const anchorsList = [
    'About',
    'Getting started',
  ].map((title) => [slugify(title), title]);

  return (
    <Layout
      title={`FlyFast - ${siteConfig.title}`}
      description="Are you ready to fly?"
    >
      <main className="flex flex-col space-y-4 max-w-[1920px] m-auto pb-4 px-4 pt-24">
        <div
          className="rounded-2xl bg-white bg-no-repeat bg-cover bg-bottom h-[1500px] lg:h-[1000px]"
          style={{
            backgroundImage: "url(" + require('@site/static/img/header-bg.jpg').default + ")"
          }}
        >
          <HomepageHeader recentPosts={[]} />

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
        <LandingPageFeature title="About" subtitle='So what is betaflight?' className="bg-black/80 text-primary-500">
          <div className=''>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
              <AboutCard
                className='border-red-600 text-red-600'
                title="Hardware support"
                Icon={CpuChipIcon}
              >
                <p>
                  Betaflight supports a wide range of flight controllers that have at least an STM32F4 Processor. The Betaflight Configurator runs on Windows, Mac OS, Linux, and Android.
                </p>
                <p>
                  The Betaflight Firmware supports the majority of Remote Control manufacturers such as FrSky, Graupner, Spektrum, DJI and FlySky. ESCs are controlled using a variety of available protocols including PWM, OneShot, MultiShot, DShot or even ProShot.
                </p>
                <p>
                  Even the less-related components do not remain untouched, with Betaflight allowing the control of many VTX and Camera settings directly from the flight controller.
                </p>
              </AboutCard>
              <AboutCard
                className='border-green-500 text-green-500'
                title="Community Support"
                Icon={UsersIcon}
              >
                <p>
                  There is so much support out there for betaflight users. Don't know where to look? We have compiled a list of our favourite resources.
                </p>
              </AboutCard>
              <AboutCard
                className=''
                title="Open Source"
                Icon={CodeBracketIcon}
              >
                <p>
                  Originating from baseflight and cleanflight, Betaflight continues to live and breath the value of open source. Everybody is welcome to implement their amazing ideas within Betaflight, either directly (preferred) or through a fork.
                </p>
              </AboutCard>
              <AboutCard
                className='border-blue-500 text-blue-500'
                title="OSD"
                Icon={CameraIcon}
              >
                <p>
                  With the Betaflight OSD you can get all relevant flight metrics directly into your FPV video feed. An easy to use drag-and-drop configuration allows the placement of values like used mAh and LiPo Voltage readings.
                </p>
                <p>
                  Additionally you can change most firmware settings using stick commands wihtout even removing your goggles.
                </p>
              </AboutCard>
              <AboutCard
                className='border-orange-600 text-orange-600'
                title="Safety Features"
                Icon={ShieldCheckIcon}
              >
                <p>
                  Drones are extremely dangerous toys. As incidents with suddenly spinning props often end with serious injury Betaflight implements several safety features to prevent dangerous situations occurring.
                </p>
                <p>
                  Features are implemented to prevent arming when the drone isn't leveled, including disabling motors in case of wrong motor or incorrect flight controller orientation.
                </p>
              </AboutCard>
              <AboutCard
                className='border-purple-600 text-purple-600'
                title="Flight Dynamics"
                Icon={JetIcon}
              >
                <p>
                  Betaflight not only strives to put the best flight code on your controller, it also looks to satisfy such requirements as perfect performance, tiny footprint, full feature set and a strong quality assurance process.
                </p>
                <p>
                  To assist in this endeavour all flight related data can be logged into a blackbox for later analysis. So pilots and technicians can objectively base their tune on the most appropriate data.
                </p>
              </AboutCard>
            </div>
          </div>
        </LandingPageFeature>
        <LandingPageFeature title="Getting started" subtitle='So what do you need to know?' className="bg-black/80 text-primary-500">
          <>
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
