import React from 'react';
import clsx from 'clsx';
import AboutHeaderFix from '../../icons/about-header.svg';
import './gradient.css';

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
    <div className="box flex flex-col w-full group gradient-group relative">
      <div
        className={clsx(
          className,
          `relative flex text-lg md:text-xl xl:text-2xl w-fit font-semibold items-center dark:group-hover:bg-neutral-750 dark:bg-neutral-800 bg-neutral-150 group-hover:bg-neutral-100 py-2 px-4 rounded-t-xl duration-300 ease-in-out transition-colors`,
          blur ? 'backdrop-blur-md' : '',
        )}
      >
        <Icon className="w-8 h-8 mr-2" />
        {title}
        <AboutHeaderFix className="absolute right-[-32px] bottom-0 dark:group-hover:fill-neutral-750 dark:fill-neutral-800 fill-neutral-150 group-hover:fill-neutral-100 duration-300 ease-in-out transition-colors"></AboutHeaderFix>
      </div>
      <div
        className={clsx(
          `w-full h-full dark:group-hover:bg-neutral-750 dark:bg-neutral-800 bg-neutral-150 group-hover:bg-neutral-100 p-4 rounded-b-xl rounded-r-xl text-base duration-300 transition-colors ease-in-out`,
          blur ? 'backdrop-blur-md' : '',
        )}
      >
        {children}
      </div>
      <div className="shadow-lg shadow-black/10 group-hover:shadow-xl h-8 -bottom-[2px] origin-center w-full rounded-b-xl duration-300 -z-10 absolute gradient"></div>
    </div>
  );
}
