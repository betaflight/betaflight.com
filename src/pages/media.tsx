import React from "react";
import { Cog6ToothIcon, Cog8ToothIcon, DocumentTextIcon, ExclamationCircleIcon, FolderIcon, PresentationChartLineIcon, PlayIcon } from "@heroicons/react/24/solid";
import YouTube from 'react-youtube';
import HomepageFeature from "../components/HomepageFeature";
import BetaflightLayout from "../components/Layout";
import AboutCard from "../components/AboutCard";


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


export default function Media() {
    return (
        <BetaflightLayout>
            <div className="relative w-full md:top-0 top-16">
                <div className="w-full h-fit flex flex-col justify-start">
                    <div className="flex flex-col md:ml-32 ml-12 md:mt-48 mt-16 h-fit w-fit">
                        <h1 className="md:text-[6rem] text-6xl border-primary-500 font-bold mb-4">
							Media
                        </h1>
                        <h2 className="text-white font-semibold md:text-3xl text-xl">Downloads & Videos</h2>
                    </div>
                </div>
            </div>
            <div className="max-w-[1920px] m-auto p-16">
                <HomepageFeature title="Downloads">
                    <div className="grid grid-cols-2 gap-x-4 text-primary-200">
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
                                    href: 'https://github.com/betaflight/betaflight-tx-lua-scripts/releases/latest',
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
                </HomepageFeature>
                <HomepageFeature title="Videos" compact={true}>
                    <div className="flex flex-wrap flex-col md:flex-row flex-start space-y-4 md:space-y-0 md:space-x-4">
                        <div>
                            <AboutCard
                                title="Betaflight 4.3 walkthrough"
                                className="text-red-500 inline-block"
                                Icon={PlayIcon}
                            >
                                <div>
                                    <YouTube videoId="LkBWRiEGKTI" />
                                </div>
                            </AboutCard>
                        </div>
                        <div>
                            <AboutCard
                                title="Betaflight 4.3 for beginners"
                                className="text-red-500"
                                Icon={PlayIcon}
                            >
                                <div>
                                    <YouTube videoId="UTFeh-SjH9A" />
                                </div>
                            </AboutCard>
                        </div>
                    </div>
                </HomepageFeature>
            </div>
        </BetaflightLayout>
    )
}