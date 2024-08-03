/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './Components/ProductTable';
import { Filters } from './Components/Filters';
import { Categories } from './Components/Categories';
import { Search } from './Components/Search/Search';
import { ResetButton } from './Components/ResetButton';

const products = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(item => item.id === product.categoryId) || null; // find by product.categoryId
  const user = usersFromServer.find(el => el.id === category.ownerId) || null; // find by category.ownerId

  return { ...product, category, user };
});

const getVisibleProducts = ({
  filterByUser,
  filterByCategory,
  searchItems,
  sortField,
}) => {
  let prods = [...products];

  if (filterByUser) {
    prods = prods.filter(item => {
      return item.user.name === filterByUser;
    });
  }

  if (filterByCategory.length) {
    prods = prods.filter(item => {
      return filterByCategory.includes(item.category.title);
    });
  }

  if (searchItems !== '') {
    const toFind = searchItems.toLowerCase();

    prods = prods.filter(item => {
      return item.name.toLowerCase().includes(toFind);
    });
  }

  if (sortField.field) {
    prods.sort((p1, p2) => {
      let result = null;

      switch (sortField.field) {
        case 'ID':
          result = p1.id - p2.id;
          break;

        case 'Product':
          result = p1.name.localeCompare(p2.name);
          break;

        case 'Category':
          result = p1.category.title.localeCompare(p2.category.title);
          break;

        case 'User':
          result = p1.user.name.localeCompare(p2.user.name);
          break;

        default:
          return 0;
      }

      return sortField.direct === 'asc' ? result : result * -1;
    });
  }

  return prods;
};

export const userInitialState = null;
export const categoriesInitialState = [];
export const sortFieldInitialState = { field: '', direct: '' };

export const App = () => {
  const [user, setUser] = useState(userInitialState);
  const [categories, setCategories] = useState(categoriesInitialState);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(sortFieldInitialState);

  const visibleProducts = getVisibleProducts({
    filterByUser: user,
    filterByCategory: categories,
    searchItems: search,
    sortField,
  });

  const handleCategoryFilters = (categoryName, status = 'add') => {
    if (!categoryName.length) {
      return setCategories(categoriesInitialState);
    }

    if (status === 'remove') {
      return setCategories(prev => prev.filter(item => item !== categoryName));
    }

    return setCategories(prev => [...prev, categoryName]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <Filters
              users={usersFromServer}
              selectedUser={user}
              filterByUser={chooseUser => setUser(chooseUser)}
            />

            <Search query={search} getQuery={query => setSearch(query)} />

            <Categories
              categories={categoriesFromServer}
              choseCategories={categories}
              filterByCategory={handleCategoryFilters}
            />

            <ResetButton
              makeAllClear={() => {
                setUser(userInitialState);
                setCategories(categoriesInitialState);
              }}
            />
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable
              products={visibleProducts}
              selectedField={sortField}
              changeSortField={(field, direct) =>
                setSortField({ field, direct })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
