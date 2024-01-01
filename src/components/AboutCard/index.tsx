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
      <div
        className={clsx(
          className,
          `relative flex text-base xl:text-lg w-fit font-semibold items-center dark:bg-neutral-500/10 bg-neutral-150/50 pt-1 pr-3 xl:p-2 xl:pr-4  rounded-t-xl`,
          blur ? 'backdrop-blur-md' : '',
        )}
      >
        <Icon className="h-4 w-4 xl:w-6 h-6 ml-2 mr-2" />
        {title}
        <AboutHeaderFix className="absolute right-[-32px] bottom-0 dark:text-neutral-500/10 text-neutral-150/50"></AboutHeaderFix>
      </div>
      <div className={clsx(`shadow-xl w-full h-full  dark:bg-neutral-500/10 bg-neutral-150/50 p-4 rounded-b-xl rounded-r-xl text-base`, blur ? 'backdrop-blur-md' : '')}>{children}</div>
    </div>
  );
}
