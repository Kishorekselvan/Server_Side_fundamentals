import { useState, useEffect } from 'react';

export const useFilter = (items, query) => {
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    setFiltered(
      items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [items, query]);

  return filtered;
};
