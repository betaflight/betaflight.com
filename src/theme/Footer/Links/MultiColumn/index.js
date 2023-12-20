import React from 'react';
import LinkItem from '@theme/Footer/LinkItem';

function ColumnLinkItem({ item }) {
  return item.html ? (
    <li
      className=""
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="">
      <LinkItem item={item} />
    </li>
  );
}

function Column({ column }) {
  return (
    <div>
      <div className="font-bold text-primary-600 mb-1">{column.title}</div>
      <ul className="flex flex-col items-center">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({ columns }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
