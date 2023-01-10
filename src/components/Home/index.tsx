import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import AboutHeaderFix from '../../icons/about-header.svg';
import { CameraIcon, CloudArrowDownIcon, CloudArrowUpIcon, CodeBracketIcon, Cog6ToothIcon, Cog8ToothIcon, CpuChipIcon, DocumentTextIcon, ExclamationCircleIcon, FolderIcon, ForwardIcon, LinkIcon, PresentationChartLineIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';
import JetIcon from '@site/src/icons/jet.icon.svg';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BlogProps } from '@site/src/types';
import BetaflightLayout from '../Layout';
import HomepageFeature from '../HomepageFeature';

function AboutCard({ title, Icon, className, children }: { title: string; className: string; Icon: React.ComponentType<React.ComponentProps<'svg'>>; children: React.ReactNode; }): JSX.Element {
	return (
		<div className="box flex flex-col w-full">
			<div
				className={clsx(className, `backdrop-blur-md relative flex text-2xl w-fit font-semibold items-center bg-neutral-500/10 py-2 px-4 rounded-t-xl`)}
			>

				<Icon className="w-8 h-8 mr-2" />
				{title}
				<AboutHeaderFix className='absolute right-[-32px] bottom-0 text-neutral-500/10'></AboutHeaderFix>
			</div>
			<div className="shadow-xl backdrop-blur-md w-full h-full bg-neutral-500/10 p-4 rounded-b-xl rounded-r-xl text-gray-200 text-base">{children}</div>
		</div>
	);
}

export default function Home({ recentPosts }: BlogProps) {
	const {siteConfig} = useDocusaurusContext();

	function clampAndFormatMinutes(minutes: number) {
        if (minutes < 1) {
            return 'One minute read';
        }
        return minutes + ' minutes read';
    }

    function formatDate(date: string) {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
    }

	return (
		<BetaflightLayout>
			<div className="relative w-full md:top-0 top-16">
				<div className="w-full h-fit flex flex-col justify-start">
					<div className="flex flex-col md:ml-32 ml-12 md:mt-48 mt-16 h-fit w-fit">
						<h1 className="md:text-[6rem] text-6xl border-primary-500 font-bold mb-4">
							Betaflight
						</h1>
						<h2 className="text-white font-semibold md:text-3xl text-xl">Are you ready to fly?</h2>
					</div>
					<div className='mt-16 px-16 flex w-full justify-around flex-col xl:flex-row space-y-4 xl:space-y-0 space-x-0 xl:space-x-16'>
						<div className="backdrop-blur-md shadow-xl w-full xl:w-1/2 flex xl:self-start self-center text-lg p-4 rounded-2xl bg-neutral-500/10">
							Betaflight is flight controller software (firmware) used to fly multi-rotor craft and fixed wing craft. This fork differs from Baseflight and Cleanflight in that it focuses on flight performance, leading-edge feature additions, and wide target support.
						</div>
						<div className='flex-grow w-full xl:w-1/2'>
							<AboutCard
								title="Recent posts"
								className='text-primary-500'
								Icon={DocumentTextIcon}
							>
								<div className='flex flex-col space-y-4'>
								{
									recentPosts.map(({ content: BlogPostContent }) => (
											<div key={BlogPostContent.metadata.source}>
												<a className='text-primary-500 text-2xl font-bold' href={BlogPostContent.metadata.permalink}>{BlogPostContent.metadata.title}</a>
												<div className='text-sm text-gray-500'>{ formatDate(BlogPostContent.metadata.date) } - { clampAndFormatMinutes(BlogPostContent.metadata.readingTime) }</div>
												<div className='text-lg text-gray-300'>{BlogPostContent.metadata.description}</div>
											</div>
										)
									)
								}
								</div>
							</AboutCard>
						</div>
					</div>
				</div>
			</div>
			<div className="px-16 pb-16">
				<HomepageFeature title="About" compact={true}>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
						<AboutCard 
							title="Hardware" 
							className="text-rose-500 fill-rose-500"
							Icon={CpuChipIcon}
							>
								<p>Betaflight supports a wide range of flight controllers with at least an STM32F4 MCU</p>
								<p>You can use nearly any piece of modern hardware out there. Full telemetry and high refresh rate for receivers, camera and VTX control, RGB LEDs, and much more!</p>
								<p>Run the configurator on any device, wether it is using Windows, MacOS, Linux, and also Andoird</p>
						</AboutCard>

						<AboutCard
							title="Community"
							className="text-sky-500 fill-sky-500"
							Icon={UsersIcon}
							>
								<p>Our community is very active and helpful. We have a very active Discord server with over 4,000 members, so you can get help if you're stuck on something</p>
								<p>You can also find a ton of helpful info on youtube, and this very site</p>
						</AboutCard>

						<AboutCard
							title="Open Source"
							className="text-lime-500 fill-lime-500"
							Icon={CodeBracketIcon}
							>
							<p>Originating from Baseflight and Cleanflight, Betaflight is open source, and you can contribute to the project on GitHub</p>
							<p>Nealy all contributions are welcome, for anything from the main flight control firmware, to the configurator, as well as this site</p>
						</AboutCard>
						<AboutCard
							className='border-blue-500 text-blue-500'
							title="OSD"
							Icon={CameraIcon}
						>
							<p>With the Betaflight OSD you can get all relevant flight metrics directly into your FPV video feed. An easy to use drag-and-drop configuration allows the placement of values like used mAh and LiPo Voltage readings.</p>
							<p>Additionally you can change most firmware settings using stick commands wihtout even removing your goggles.</p>
						</AboutCard>
						<AboutCard
							className='border-orange-600 text-orange-600'
							title="Safety Features"
							Icon={ShieldCheckIcon}
						>
							<p>Drones are extremely dangerous toys. As incidents with suddenly spinning props often end with serious injury Betaflight implements several safety features to prevent dangerous situations occurring.</p>
							<p>Features are implemented to prevent arming when the drone isn't leveled, including disabling motors in case of wrong motor or incorrect flight controller orientation.</p>
						</AboutCard>
						<AboutCard
							className='border-purple-600 text-purple-600'
							title="Flight Dynamics"
							Icon={JetIcon}
						>
							<p>Betaflight not only strives to put the best flight code on your controller, it also looks to satisfy such requirements as perfect performance, tiny footprint, full feature set and a strong quality assurance process.</p>
							<p>To assist in this endeavour all flight related data can be logged into a blackbox for later analysis. So pilots and technicians can objectively base their tune on the most appropriate data.</p>
						</AboutCard>
					</div>
				</HomepageFeature>
			</div>
		</BetaflightLayout>
	);
}