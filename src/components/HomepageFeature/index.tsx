import React from 'react';
import clsx from 'clsx';

type Props = {
  title?: string
  className?: string
  children?: React.ReactNode
  compact?: boolean
}

export default function HomepageFeature({ title = '<unset>', compact = false, className, children }: Props): JSX.Element {
  return (
    <section className={className}>
      <h2 className="text-primary-500 text-3xl font-bold my-4 ml-1">{title}</h2>
      <div className={clsx({ 'bg-neutral-500/10 shadow-xl p-8 backdrop-blur-md': !compact }, 'flex justify-center rounded-2xl')}>{children}</div>
    </section>
  );
}
