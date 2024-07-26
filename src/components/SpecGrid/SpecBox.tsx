import React from 'react';

export default function SpecBox({ icon, title, color, children, colSpan = 1 }) {
  let bgColor = '';
  let primaryTextColor = '';
  let secondaryTextColor = '';
  let childFontSize = '';

  switch (color) {
    case 'primary':
      bgColor = 'bg-primary-500';
      primaryTextColor = 'text-black';
      secondaryTextColor = 'text-black';
      childFontSize = '2xl:text-3xl lg:text-xl text-3xl';
      break;
    case 'secondary':
      bgColor = 'bg-primary-500/10';
      primaryTextColor = 'text-primary-500';
      secondaryTextColor = '';
      childFontSize = '2xl:text-2xl lg:text-xl text-2xl';
      break;
    case 'neutral':
      bgColor = 'bg-neutral-500/20';
      primaryTextColor = '';
      secondaryTextColor = '';
      childFontSize = '2xl:text-2xl lg:text-xl text-2xl';
      break;
    case 'neutral-light':
      bgColor = 'bg-neutral-500/10';
      primaryTextColor = '';
      secondaryTextColor = '';
      childFontSize = '2xl:text-xl lg:text-xl text-xl';
      break;
    default:
      bgColor = 'bg-neutral-500/10';
      primaryTextColor = '';
      secondaryTextColor = '';
      childFontSize = '2xl:text-2xl lg:text-xl text-2xl';
  }

  let colSpanClass = 'col-span-1';

  switch (colSpan) {
    case 2:
      colSpanClass = 'col-span-2';
      break;
    case 3:
      colSpanClass = 'col-span-3';
      break;
    default:
      colSpanClass = 'col-span-1';
  }

  return (
    <div className={`${bgColor} ${colSpanClass} rounded-lg flex flex-col gap-2 p-4`}>
      <div className={`flex items-center gap-1 ${primaryTextColor}`}>
        {icon}
        <div className="font-bold">{title}</div>
      </div>
      <div className={`${secondaryTextColor} ${childFontSize} font-semibold`}>{children}</div>
    </div>
  );
}
