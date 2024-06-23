import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api';

const SomeComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };

    getItems();
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default SomeComponent;
