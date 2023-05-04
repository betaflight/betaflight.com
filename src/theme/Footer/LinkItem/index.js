import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faBlog, faComments } from '@fortawesome/free-solid-svg-icons';

export default function FooterLinkItem({ item }) {
  const { to, href, label, icon, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  function getFaIcon(icon) {
    switch (icon) {
      case 'youtube':
        return faYoutube;
      case 'discord':
        return faDiscord;
      case 'blog':
        return faBlog;
      case 'github':
        return faGithub;
      case 'forum':
        return faComments;
      case 'link':
      case 'site':
        return faGlobe;
      default:
        return null;
    }
  }

  return (
    <Link
      className="fancy-link pb-1 no-underline flex"
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
        <div className="w-[24px]">
          <FontAwesomeIcon icon={getFaIcon(icon)} className="" />
        </div>
      )}
      {label}
      {href && !isInternalUrl(href)}
    </Link>
  );
}
