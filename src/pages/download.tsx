import React, { useMemo } from 'react';
import { Cog6ToothIcon, Cog8ToothIcon, DocumentTextIcon, ExclamationCircleIcon, FolderIcon, PresentationChartLineIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useMediaQuery } from 'react-responsive';
import YouTube from 'react-youtube';
import HomepageFeature from '../components/HomepageFeature';
import BetaflightLayout from '../components/Layout';
import AboutCard from '../components/AboutCard';

type IconElementFeatureProps = {
  Icon: React.ComponentType<React.ComponentProps<'svg'>>
  title: string
  description?: string
  link?: {
    text: string
    href: string
    icon?: React.ComponentType<React.ComponentProps<'svg'>>
  }
  children?: React.ReactNode
}

function IconElementFeature({ Icon, title, description, link, children }: IconElementFeatureProps): JSX.Element {
  return (
    <div className="flex">
      <Icon className="h-[2rem] w-[2rem] min-w-[2rem] min-h-[2rem] text-primary-600"></Icon>
      <div className="ml-2">
        <div className="text-lg font-bold mb-2 text-primary-600">{title}</div>
        {description && <div className="mb-2">{description}</div>}
        {link && (
          <a className="fancy-link no-underline flex items-center" href={link.href}>
            {link.icon && <link.icon className="h-4 w-4 mr-2"></link.icon>}
            {link.text}
          </a>
        )}
        {children}
      </div>
    </div>
  );
}

export default function Media() {
  const isXl = useMediaQuery({ query: '(min-width: 1024px)' });

  const videoSize = useMemo(() => {
    if (isXl) {
      return {
        width: 640,
        height: 400,
      };
    } else {
      return {
        width: 320,
        height: 200,
      };
    }
  }, [isXl]);

  return (
    <BetaflightLayout>
      <div className="m-auto p-6 mt-0 xl:mt-16">
        {/* Start Downloads block */}

        <HomepageFeature blur title="Downloads">
          <div className="grid max-w-fit grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col space-y-4">
              <IconElementFeature title="Betaflight Configurator" Icon={Cog6ToothIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      Betaflight Configurator is a Windows/OSX/Linux application for building, flashing and configuring Betaflight. Download the{' '}
                      <a href="https://github.com/betaflight/betaflight-configurator/releases/latest" className="fancy-link no-underline">
                        {' '}
                        latest release
                      </a>
                      {' '}or run the <a href="https://app.betaflight.com" target="_top" className="fancy-link no-underline">latest version</a> directly in your browser.
                    </span>
                  </div>
                </div>
              </IconElementFeature>

              <IconElementFeature title="Betaflight Firmware" Icon={Cog6ToothIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      For Betaflight 4.4 and higher, Configurator builds a custom firmware file 'in the cloud' and flashes it to your flight controller. For 4.3 and earlier, download the correct{' '}
                      <a href="https://github.com/betaflight/betaflight/releases" className="fancy-link no-underline">
                        {' '}
                        'hex' file for your flight controller
                      </a>{' '}
                      and flash it manually.
                    </span>
                  </div>
                </div>
              </IconElementFeature>

              <IconElementFeature title="Lua Tx Scripts" Icon={Cog6ToothIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      Adjust Betaflight's settings with your radio transmitter with Betaflight's{' '}
                      <a href="https://github.com/betaflight/betaflight-tx-lua-scripts/releases/latest" className="fancy-link no-underline">
                        {' '}
                        Lua Tx scripts.
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </IconElementFeature>

              <IconElementFeature title="BlackBox Log Viewer" Icon={PresentationChartLineIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      Review flight data logs, map the flight and check debug values with{' '}
                      <a href="https://github.com/betaflight/blackbox-log-viewer/releases" className="fancy-link no-underline">
                        {' '}
                        Betaflight Blackbox Log Viewer
                      </a>
                      {' '}or run the <a href="https://blackbox.betaflight.com" target="_top" className="fancy-link no-underline">latest version</a> directly in your browser.
                    </span>
                  </div>
                </div>
              </IconElementFeature>
            </div>

            {/* End left column, start right column */}

            <div className="flex flex-col space-y-4">
              <IconElementFeature
                title="Beta testing (WARNING)"
                Icon={ExclamationCircleIcon}
                description="Test the latest upcoming features and contribute to Betaflight's development by using the nightly builds:"
              >
                <div className="flex flex-col">
                  <a href="https://github.com/betaflight/betaflight-configurator-nightlies/releases" className="fancy-link no-underline">
                    {' '}
                    Betaflight Configurator Nightly builds
                  </a>
                  <a href="https://github.com/betaflight/betaflight-tx-lua-scripts-nightlies/releases" className="fancy-link no-underline">
                    Betaflight TX Lua Scripts Nightly builds
                  </a>
                  <a href="https://github.com/betaflight/blackbox-log-viewer-nightlies/releases" className="fancy-link no-underline">
                    Blackbox Viewer Nightly builds
                  </a>
                </div>
              </IconElementFeature>

              <IconElementFeature title="Source code" Icon={DocumentTextIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      Review and download the source code on the{' '}
                      <a href="https://github.com/betaflight/" className="fancy-link no-underline">
                        Betaflight GitHub Repository
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </IconElementFeature>

              <IconElementFeature title="Documentation" Icon={DocumentTextIcon}>
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-1 mt-0">
                    <span>
                      Wiki, Development and other documentation may be found in the{' '}
                      <a href="https://github.com/betaflight/betaflight.com" className="fancy-link no-underline">
                        betaflight.com docs directory
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </IconElementFeature>
            </div>
          </div>
        </HomepageFeature>

        {/* Start Videos block */}

        <HomepageFeature className="" title="Videos" compact={true}>
          <div className="flex flex-wrap flex-col md:flex-row flex-start space-y-4 md:space-y-0 md:space-x-4">
            <div>
              <AboutCard title="Betaflight 4.3 walkthrough" className="text-primary-600" Icon={PlayIcon}>
                <div>
                  <YouTube videoId="LkBWRiEGKTI" opts={videoSize} />
                </div>
              </AboutCard>
            </div>

            <div>
              <AboutCard title="Betaflight 4.3 for beginners" className="text-primary-600" Icon={PlayIcon}>
                <div>
                  <YouTube videoId="UTFeh-SjH9A" opts={videoSize} />
                </div>
              </AboutCard>
            </div>
          </div>
        </HomepageFeature>

        {/* End Videos block */}
      </div>
    </BetaflightLayout>
  );
}
