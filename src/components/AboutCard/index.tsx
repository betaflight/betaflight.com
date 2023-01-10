import React from "react";
import clsx from "clsx";
import AboutHeaderFix from '../../icons/about-header.svg';

export default function AboutCard({ title, Icon, className, children }: { title: string; className: string; Icon: React.ComponentType<React.ComponentProps<'svg'>>; children: React.ReactNode; }): JSX.Element {
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