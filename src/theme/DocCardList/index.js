import React from 'react';
import { useCurrentSidebarCategory, filterDocCardListItems } from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';
function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}
export default function DocCardList(props) {
  const { items } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {filteredItems.map((item, index) => (
        <article key={index} className="w-full">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
