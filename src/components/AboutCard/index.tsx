import React from 'react';
import clsx from 'clsx';
import AboutHeaderFix from '../../icons/about-header.svg';

export default function AboutCard({
  title,
  Icon,
  className,
  children,
  blur,
}: {
  title: string
  className: string
  Icon: React.ComponentType<React.ComponentProps<'svg'> | JSX.Element>
  children: React.ReactNode
  blur?: boolean
}): JSX.Element {
  return (
    <div className="box flex flex-col w-full">
      <div className={clsx(className, `relative flex text-lg md:text-xl xl:text-2xl w-fit font-semibold items-center bg-neutral-500/10 py-2 px-4 rounded-t-xl`, blur ? 'backdrop-blur-md' : '')}>
        <Icon className="w-8 h-8 mr-2" />
        {title}
        <AboutHeaderFix className="absolute right-[-32px] bottom-0 text-neutral-500/10"></AboutHeaderFix>
      </div>
      <div className={clsx(`shadow-xl w-full h-full bg-neutral-500/10 p-4 rounded-b-xl rounded-r-xl text-gray-200 text-base`, blur ? 'backdrop-blur-md' : '')}>{children}</div>
    </div>
  );
}
