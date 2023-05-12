import React from 'react';
import clsx from 'clsx';
import AboutHeaderFix from '../../icons/about-header.svg';

export default function FancyAboutCard({
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
    <div className="box flex flex-col w-full group relative">
      <div
        className={clsx(
          className,
          `relative flex text-lg md:text-xl xl:text-2xl w-fit font-semibold items-center group-hover:bg-neutral-750 bg-neutral-800 py-2 px-4 rounded-t-xl duration-300 transition-colors`,
          blur ? 'backdrop-blur-md' : '',
        )}
      >
        <Icon className="w-8 h-8 mr-2" />
        {title}
        <AboutHeaderFix className="absolute right-[-32px] bottom-0 group-hover:text-neutral-750 text-neutral-800 duration-300 transition-colors"></AboutHeaderFix>
      </div>
      <div
        className={clsx(
          `shadow-xl w-full h-full group-hover:bg-neutral-750 bg-neutral-800 p-4 rounded-b-xl rounded-r-xl text-gray-200 text-base duration-300 transition-colors`,
          blur ? 'backdrop-blur-md' : '',
        )}
      >
        {children}
      </div>
      <div className="absolute opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary-500/80 to-transparent h-8 -bottom-0.5 origin-center w-full -z-10 rounded-b-xl duration-300 !transition-all"></div>
    </div>
  );
}
