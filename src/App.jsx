/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './Components/ProductTable';
import { Filters } from './Components/Filters';
import { Categories } from './Components/Categories';

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
}) => {
  let prods = [...products];

  if (filterByUser !== 'all') {
    prods = prods.filter(item => {
      return item.user.name === filterByUser;
    });
  }

  if (filterByCategory !== 'all') {
    prods = prods.filter(item => {
      return item.category.title === filterByCategory;
    });
  }

  if (searchItems !== '') {
    const toFind = searchItems.toLowerCase();

    prods = prods.filter(item => {
      return item.name.toLowerCase().includes(toFind);
    });
  }

  return prods;
};

export const App = () => {
  const [user, setUser] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const visibleProducts = getVisibleProducts({
    filterByUser: user,
    filterByCategory: category,
    searchItems: search,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <Filters
              users={usersFromServer}
              filterByUser={chooseUser => setUser(chooseUser)}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearch('')}
                  />
                </span>
              </p>
            </div>

            <Categories
              categories={categoriesFromServer}
              filterByCategory={categoryName => setCategory(categoryName)}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setUser('all');
                  setCategory('all');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable products={visibleProducts} />
          )}
        </div>
      </div>
    </div>
  );
};
