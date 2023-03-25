import React from 'react';
import { CameraIcon, CodeBracketIcon, CpuChipIcon, DocumentTextIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';
import JetIcon from '@site/src/icons/jet.icon.svg';
import { BlogProps } from '@site/src/types';
import BetaflightLayout from '../Layout';
import HomepageFeature from '../HomepageFeature';
import AboutCard from '../AboutCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';
import TeamFeature from '../Team';

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
      <div className="relative w-full mt-4 xl:mt-32">
        <div className="w-full h-fit flex flex-col justify-center md:justify-start">
          <div className="flex flex-col p-6 h-fit w-fit xl:ml-12">
            <h1 className="md:text-[6rem] text-6xl border-primary-500 font-bold mb-4">Betaflight</h1>
            <h2 className="text-white font-semibold md:text-3xl text-xl">Pushing the Limits of UAV Performance</h2>
          </div>
          <div className="p-4 xl:p-16 flex w-full justify-around flex-col xl:flex-row space-y-4 xl:space-y-0 space-x-0 xl:space-x-16">
            <div className="backdrop-blur-md shadow-xl w-full xl:w-1/2 flex xl:self-start self-center text-lg p-4 rounded-2xl bg-neutral-500/10">
              Betaflight is a flight firmware used for controlling multi-rotor radio controlled aircraft. <br></br>
              <br></br>
              Originating from the Baseflight and Cleanflight open source projects, the project was branched off as a high performance 'Beta' testbed. <br></br>
              <br></br>
              Now matured with years of evidence lead development, Betaflight has grown into the largest flight firmware userbase in the sector due to its cutting edge features, performance and
              reliability.
            </div>
            <div className="flex-grow w-full xl:w-1/2">
              <AboutCard title="Recent posts" className="text-primary-500" Icon={DocumentTextIcon}>
                <div className="flex flex-col space-y-4">
                  {recentPosts &&
                    recentPosts.length > 0 &&
                    recentPosts.map(({ content: BlogPostContent }) => (
                      <div key={BlogPostContent.metadata.source}>
                        <a className="text-primary-500 text-2xl font-bold" href={BlogPostContent.metadata.permalink}>
                          {BlogPostContent.metadata.title}
                        </a>
                        <div className="text-sm text-gray-500">
                          {formatDate(BlogPostContent.metadata.date)} - {clampAndFormatMinutes(BlogPostContent.metadata.readingTime)}
                        </div>
                        <div className="text-lg text-gray-300">{BlogPostContent.metadata.description}</div>
                      </div>
                    ))}
                  {!recentPosts || (recentPosts.length === 0 && <div className="text-lg text-center">Nothing posted yet</div>)}
                </div>
              </AboutCard>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 xl:p-16 flex flex-col space-y-4">
        <HomepageFeature title="About" compact={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 w-full">
            <AboutCard title="Hardware" className="text-rose-500 fill-rose-500" Icon={CpuChipIcon}>
              <p>Betaflight supports a wide range of flight controllers from a variety of manufacturers.</p>
              <p>The 'Betaflight Partner' program provides hardware manufacturer recommendations from the development team.</p>
            </AboutCard>

            <AboutCard title="Community" className="text-sky-500 fill-sky-500" Icon={UsersIcon}>
              <p>The user community is active and helpful, with a Facebook group of over 30,000 members and growing Discord server.</p>
              <p>Considerable support resources also exist on youtube made by third parties.</p>
            </AboutCard>

            <AboutCard title="Open Source" className="text-lime-500 fill-lime-500" Icon={CodeBracketIcon}>
              <p>Betaflight is 'Open Source' code, so you can view and contribute to the project on GitHub.</p>
              <p>The team has a robust review system in order to maintain clean code, and we are always looking for talented contributors.</p>
            </AboutCard>
            <AboutCard className="border-blue-500 text-blue-500" title="OSD" Icon={CameraIcon}>
              <p>With the Betaflight On Screen Display you can use drag-and-drop to set up key flight metrics into your FPV video feed. </p>
              <p> This allows data such as battery metrics, speed, altitude and home direction.</p>
            </AboutCard>
            <AboutCard className="border-orange-600 text-orange-600" title="Safety Features" Icon={ShieldCheckIcon}>
              <p>Alerts for and arming blocks for improper setup, and disarm mechanisms are built in to avoid accidents. </p>
              <p>A comprehensive failsafe mechanism is featured to assist in flight issues</p>
            </AboutCard>
            <AboutCard className="border-purple-600 text-purple-600" title="Flight Dynamics" Icon={JetIcon}>
              <p>Betaflight was created for cutting edge flight performance. This has been achieved optimising reaction time to disturbances, and increasing the accuracy of stick tracking.</p>
            </AboutCard>
          </div>
        </HomepageFeature>
        <HomepageFeature title="Team">
          <TeamFeature></TeamFeature>
        </HomepageFeature>
        <HomepageFeature title="Team Sponsors">
          <div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <div className="relative rounded-xl overflow-hidden">
                <a href="/partner">
                  <img src="/img/sponsors/Betaflight_Approved.png" alt="BetaflightApproved" className="max-h-[300px] w-auto" />
                </a>
              </div>
              {/* <div className="rounded-xl overflow-hidden">
                <a href="https://www.tititop.com/" target="_blank" rel="noreferrer">
                  <img src="/img/sponsors/DOGCOM.png" alt="DogCom" className="max-h-[150px] w-auto" />
                </a>
              </div> */}
              <div className="rounded-xl overflow-hidden">
                <a href="https://www.hqprop.com/" target="_blank" rel="noreferrer">
                  <img src="/img/sponsors/HQPROP.png" alt="HQProp" className="invert  max-h-[300px] w-auto" />
                </a>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <div className="rounded-xl overflow-hidden">
                <a href="https://www.radiomasterrc.com/" target="_blank" rel="noreferrer">
                  <img src="/img/sponsors/Radio-Master-Logo.png" alt="RadioMaster" className="invert max-h-[300px] w-auto" />
                </a>
              </div>
            </div>
          </div>
        </HomepageFeature>
        <HomepageFeature title="Donating">
          <div className="flex flex-col xl:flex-row space-x-4 justify-center items-center">
            <div className="flex flex-col space-y-4 text-white">
              <p>Highly skilled developers lend their time for free in order to develop and maintain this project.</p>
              <p>We would really appreciate your support if you enjoy this firmware or use it for professional work.</p>
              <p>We use the donations to help with out of pocket costs, e.g. test hardware, hardware analysis equipment and running build servers.</p>
              <p>We are exceptionally grateful for those who do donate, either their time or funds.</p>
            </div>
            <div className="md:flex gap-4 mt-4">
              <div className="md:w-60 w-full text-center rounded-2xl bg-neutral-500/10 p-6 flex flex-col justify-between">
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
