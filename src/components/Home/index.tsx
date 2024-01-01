import React from 'react';
import { CameraIcon, CodeBracketIcon, CpuChipIcon, DocumentTextIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';
import JetIcon from '@site/src/icons/jet.icon.svg';
import { BlogProps } from '@site/src/types';
import BetaflightLayout from '../Layout';
import HomepageFeature from '../HomepageFeature';
import AboutCard from '../AboutCard';
import FancyAboutCard from '../FancyAboutCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';
import TeamFeature from '../Team';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home({ recentPosts }: BlogProps) {
  function clampAndFormatMinutes(minutes: number) {
    if (minutes < 1) {
      return 'One minute read';
    }
    return `${minutes} minutes read`;
  }

  function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }

  function onClickDonate(service: string) {
    switch (service) {
      case 'paypal':
        return () => window.open('https://paypal.me/betaflight', '_blank', 'noopener');
      case 'patreon':
        return () => window.open('https://patreon.com/betaflight', '_blank', 'noopener');
      default:
        break;
    }
  }

  return (
    <BetaflightLayout>
      <div className="flex flex-col items-center m-0 xs:mt-0 sm:mt-2 xl:mt-20">
        <div className="flex flex-col">
          <ThemedImage 
            alt="Betaflight"
            className="p-6 h-fit w-fit xl:mr-12"
            sources={{
                light: useBaseUrl('/img/betaflight/logo_light.svg'),
                dark: useBaseUrl('/img/betaflight/logo_dark.svg')
            }}
          />
        </div>
        <div className="flex flex-col xl:w-4/5 m-4 space-y-4">
          <div className="backdrop-blur-md shadow-xl flex xl:self-start p-4 rounded-2xl bg-neutral-500/10">
            <p className="text-center text-md">
              <h2 className="text-primary-600 font-bold text-3xl mb-4">Pushing the Limits of UAV Performance</h2>
              <p className="xs:text-sm sm:text-lg xl:text-xl">
                Betaflight is the world's leading multi-rotor flight control software.<br></br>
                The global FPV drone racing and freestyle community choose Betaflight for its performance, precision, cutting edge features, reliability and hardware support.<br></br>
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="m-4 flex flex-col space-y-4">
        <HomepageFeature title="Sponsors" blur={true}>
          <div className="m-0 p-0">
            <div className="flex flex-cols-4 gap-2 sm:gap-5 xs:gap-0 ">
              <div className="w-3/5 p-0 lg:w-1/4 pr-5">
                <a href="https://www.hqprop.com/" target="_blank" rel="noreferrer noopener">
                  <img
                    alt="HQProp"
                    className="themeInvert"
                    src="/img/betaflight/sponsors/hqprop.svg"
                  />
                </a>
              </div>
              <div className="pt-1 w-4/5 p-0 lg:w-2/5">
                <a href="https://www.radiomasterrc.com/" target="_blank" rel="noreferrer noopener">
                  <img
                    alt="RadioMaster"
                    className="themeInvert"
                    src="/img/betaflight/sponsors/radiomaster.svg"
                  />
                </a>
              </div>
              <div className="pt-2 w-3/5 p-0 lg:w-2/5">
                <a href="https://www.axisflying.com/" target="_blank" rel="noreferrer noopener">
                  <ThemedImage 
                    alt="Axisflying"
                    sources={{
                      light: useBaseUrl('/img/betaflight/sponsors/axisflying_light.svg'),
                      dark: useBaseUrl('/img/betaflight/sponsors/axisflying_dark.svg')
                    }}
                  />
                </a>
              </div>
              <div className="pt-3 w-4/5 xs:w-1 lg:w-2/5">
                <a href="https://www.tititop.com/" target="_blank" rel="noreferrer noopener">
                  <img
                    alt="DogCom"
                    src="/img/betaflight/sponsors/dogcom.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </HomepageFeature>
        <HomepageFeature title="About" compact={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 w-full">
            <FancyAboutCard title="Hardware" className="text-primary-600 text-justify" Icon={CpuChipIcon}>
              <p>
                Betaflight supports a wide range of flight controllers from a variety of manufacturers. The{' '}
                <a className="fancy-link no-underline" href="/partner">
                  Betaflight Partner
                </a>{' '}
                program provides hardware manufacturer recommendations from the development team.
              </p>
            </FancyAboutCard>

            <FancyAboutCard title="Community" className="text-primary-600 text-justify" Icon={UsersIcon}>
              <p>
                The user community is active and helpful, with a Facebook group of over 30,000 members and a growing{' '}
                <a className="fancy-link no-underline" href="https://discord.betaflight.com/invite">
                  Discord server
                </a>
                . Considerable support resources also exist on Youtube, made by third parties.
              </p>
            </FancyAboutCard>

            <FancyAboutCard title="Open Source" className="text-primary-600 text-center" Icon={CodeBracketIcon}>
              <p>
                Betaflight is 'Open Source', so you can look at the source code and contribute to the project on{' '}
                <a className="fancy-link no-underline" href="https://github.com/betaflight/betaflight">
                  GitHub
                </a>
                . The team has a robust review system in order to maintain clean code, and we are always looking for talented contributors.
              </p>
            </FancyAboutCard>
            <FancyAboutCard className="text-primary-600" title="OSD" Icon={CameraIcon}>
              <p>
                With the Betaflight On Screen Display you can use drag-and-drop to set up key flight metrics into your FPV video feed. This allows data such as battery metrics, speed, altitude and
                home direction.
              </p>
            </FancyAboutCard>
            <FancyAboutCard className="text-primary-600" title="Safety Features" Icon={ShieldCheckIcon}>
              <p>Alerts for and arming blocks for improper setup, and disarm mechanisms are built in to avoid accidents. A comprehensive failsafe mechanism is featured to assist in flight issues.</p>
            </FancyAboutCard>
            <FancyAboutCard className="text-primary-600" title="Flight Dynamics" Icon={JetIcon}>
              <p>
                Betaflight was created for cutting edge flight performance. This has been achieved by optimizing the reaction time to disturbances, the accuracy of stick tracking, and the processing
                of digital signals.
              </p>
            </FancyAboutCard>
          </div>
        </HomepageFeature>
        <HomepageFeature title="Team">
          <TeamFeature></TeamFeature>
        </HomepageFeature>
        <HomepageFeature title="Donations">
          <div className="flex flex-col xl:flex-row space-x-4 justify-center items-center gap-4">
            <div className="space-y-4">
              <div className="float-right">
                <p className="text-lg text-center">
                  Highly skilled developers lend their time for free in order to develop and maintain this project.<br></br>
                  If you enjoy this firmware or use it for professional work we would really appreciate your support.<br></br>
                  We use the donations to help with out of pocket costs, e.g. test hardware, hardware analysis equipment and running build servers.<br></br>
                  For those who do donate either their time or funds, we are exceptionally grateful for.
                </p>
              </div>
            </div>
            <div className="md:flex gap-4 mt-4">
              <div className="md:w-60 w-full text-center rounded-2xl bg-neutral-400/10 p-6 flex flex-col justify-between">
                <h1 className="font-bold text-xl">
                  <FontAwesomeIcon icon={faPaypal} className="text-blue-600 mr-2" />
                  Paypal
                </h1>
                <p className="my-4">For a once off donation to the cause with no ongoing commitment.</p>
                <Button onClick={onClickDonate('paypal')}>Donate</Button>
              </div>
              <div className="mt-4 md:mt-0 md:w-60 w-full text-center rounded-2xl bg-neutral-500/10 p-6 flex flex-col justify-between">
                <h1 className="font-bold text-xl">
                  <FontAwesomeIcon icon={faPatreon} className="text-red-600 mr-2" />
                  Patreon
                </h1>
                <p className="my-4">To setup a monthly recurring donation for ongoing support, commitment and thanks.</p>
                <Button onClick={onClickDonate('patreon')}>Donate</Button>
              </div>
            </div>
          </div>
        </HomepageFeature>
      </div>
    </BetaflightLayout>
  );
}
