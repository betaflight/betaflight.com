import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import isInternalUrl from '@docusaurus/isInternalUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faBlog, faComments } from '@fortawesome/free-solid-svg-icons'

export default function FooterLinkItem({ item }) {
  const { to, href, label, icon, prependBaseUrlToHref, ...props } = item
  const toUrl = useBaseUrl(to)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })

  function getFaIcon(icon) {
    switch (icon) {
      case 'youtube':
        return faYoutube
      case 'discord':
        return faDiscord
      case 'blog':
        return faBlog
      case 'github':
        return faGithub
      case 'forum':
        return faComments
      case 'link':
      case 'site':
        return faGlobe
      default:
        return null
    }
  }

  return (
    <Link
      className="text-blue-400 underline flex items-center"
      {...(href
        ? {
          href: prependBaseUrlToHref ? normalizedHref : href,
        }
        : {
          to: toUrl,
        })}
      {...props}
    >
      {icon && (
        <div className="w-[24px] mr-2 text-center">
          <FontAwesomeIcon icon={getFaIcon(icon)} className="text-neutral-500" />
        </div>
      )}
      {label}
      {href && !isInternalUrl(href)}
    </Link>
  )
}
