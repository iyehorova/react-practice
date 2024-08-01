import cn from 'classnames';

export const Categories = ({ categories, choseCategory, filterByCategory }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
        onClick={() => filterByCategory('all')}
      >
        All
      </a>
      {categories.map(category => (
        <a
          data-cy="Category"
          key={category.title}
          className={cn('button mr-2 my-1', {
            'is-info': choseCategory === category.title,
          })}
          href="#/"
          onClick={() => filterByCategory(category.title)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
