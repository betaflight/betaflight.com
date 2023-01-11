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
import TeamFeature from '../team';


export default function Home({ recentPosts }: BlogProps) {

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
			<div className="px-16 pb-16 flex flex-col space-y-4">
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
				<HomepageFeature title="Team">
					<div>
						<TeamFeature></TeamFeature>
					</div>
				</HomepageFeature>
				<HomepageFeature title="Donating">
					<div className="flex space-x-4 justify-center items-center">
						<div className='flex flex-col space-y-4 text-white text-xl'>
							<p>Many of our users don't have the time to contribute but do love our software such that they want to continue to support us. The best way is to help out by donating.</p>
							<p>What are donations used for? We use the donations to help with the maintainers out of pocket costs, e.g. running build servers etc. We also use it to purchase test equipment, e.g. Saleae logic analysers, and other items to assist consistent contributors in their efforts. We are exceptionally grateful for those who do donate, either their time or funds.</p>
						</div>
						<div className='flex space-x-4 mt-4'>
							<div className='w-60 text-center rounded-2xl bg-neutral-500/10 p-6 flex flex-col justify-between'>
								<h1 className='font-bold text-xl'>
									<FontAwesomeIcon icon={faPaypal} className='text-blue-600 mr-2' />
									Paypal
								</h1>
								<p className='my-4'>For a once off donation to the cause with no ongoing commitment.</p>
								<Button onClick={onClickDonate('paypal')}>Donate</Button>
							</div>
							<div className='w-60 text-center rounded-2xl bg-neutral-500/10 p-6 flex flex-col justify-between'>
								<h1 className='font-bold text-xl'>
									<FontAwesomeIcon icon={faPatreon} className='text-red-600 mr-2' />
									Patreon
								</h1>
								<p className='my-4'>To setup a monthly recurring donation for ongoing support and commitment.</p>
								<Button onClick={onClickDonate('patreon')}>Donate</Button>
							</div>
						</div>
					</div>
				</HomepageFeature>
			</div>
		</BetaflightLayout>
	);
}