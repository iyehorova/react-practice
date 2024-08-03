import cn from 'classnames';

export const Categories = ({
  categories,
  choseCategories,
  filterByCategory,
}) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6', {
          'is-outlined': choseCategories.length > 0,
        })}
        onClick={() => filterByCategory([])}
      >
        All
      </a>
      {categories.map(category => (
        <a
          data-cy="Category"
          key={category.title}
          className={cn('button mr-2 my-1', {
            'is-info': choseCategories.includes(category.title),
          })}
          href="#/"
          onClick={() => {
            if (choseCategories.includes(category.title)) {
              return filterByCategory(category.title, 'remove');
            }

            return filterByCategory(category.title, 'add');
          }}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
