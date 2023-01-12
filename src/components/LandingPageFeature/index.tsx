import React from 'react'
import clsx from 'clsx'
import slugify from 'react-slugify'

type Props = {
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
  addToList?: (slug: string, title: string) => void
}

export default function LandingPageFeature({ title, subtitle, children, addToList, className }: Props) {
  const slug = slugify(title)
  if (addToList) {
    addToList(slug, title)
  }
  return (
    <div id={slugify(title)} className={clsx('p-4 rounded-2xl', className)}>
      <h1 className="mb-2 text-4xl font-bold uppercase text-center">{title}</h1>
      {subtitle && <h3 className="mb-4 text-xl text-gray-400 text-center">{subtitle}</h3>}
      {children}
    </div>
  )
}
