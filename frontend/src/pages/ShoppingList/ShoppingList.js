import React, { useEffect } from 'react';
import apiUtil from 'utils/api';

const ShoppingList = () => {
  useEffect(() => {
    apiUtil().get('/shopping_list')
      .then((res) => {
        console.log(res);
      });
  });

  return (
    <div>

    </div>
  );
};

export default ShoppingList;
