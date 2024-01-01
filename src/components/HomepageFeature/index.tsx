import React from 'react';
import clsx from 'clsx';

type Props = {
  title?: string
  className?: string
  children?: React.ReactNode
  compact?: boolean
  blur?: boolean
}

export default function HomepageFeature({ title = '<unset>', compact = false, className, children, blur }: Props): JSX.Element {
  return (
    // <section className={className}>
    //   <h2 className="text-primary-600 text-3xl font-bold my-4 ml-1">{title}</h2>
    //   <div className={clsx({ 'bg-neutral-500/10 shadow-xl p-8': !compact }, 'flex justify-center rounded-2xl')}>{children}</div>
    // </section>
    // make background blur depend on blur prop
    <section className={className}>
      <h2 className="text-primary-600 text-3xl font-bold m-0 sm:m-1 base:m-2 md:m-4">{title}</h2>
      {/* eslint-disable-next-line no-restricted-globals */}
      <div className={clsx({ 'bg-neutral-500/10 shadow-xl mb-6  p-4 xl:p-6': !compact }, 'flex justify-center rounded-2xl', blur ? 'backdrop-blur-md' : '')}>{children}</div>
    </section>
  );
}
