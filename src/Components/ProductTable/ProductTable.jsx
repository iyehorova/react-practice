import cn from 'classnames';

export const ProductTable = ({ products, selectedField, changeSortField }) => {
  const fields = ['ID', 'Product', 'Category', 'User'];
  // const handleSortField = field => {
  //   if (selectedField.field === field && selectedField.direct === 'asc') {
  //     changeSortField(field, 'desc');
  //   }

  //   if (selectedField.field === field && selectedField.direct === 'desc') {
  //     changeSortField('', '');
  //   }

  //   changeSortField(field, 'asc');
  // };

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <a
                  href="#/"
                  onClick={() => {
                    if (
                      selectedField.field === field &&
                      selectedField.direct === 'asc'
                    ) {
                      return changeSortField(field, 'desc');
                    }

                    if (
                      selectedField.field === field &&
                      selectedField.direct === 'desc'
                    ) {
                      return changeSortField('', '');
                    }

                    return changeSortField(field, 'asc');
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={cn('fas', {
                        'fa-sort': selectedField.field !== field,
                        'fa-sort-up':
                          selectedField.field === field &&
                          selectedField.direct === 'asc',
                        'fa-sort-down':
                          selectedField.field === field &&
                          selectedField.direct === 'desc',
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
          {/* <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <a href="#/" onClick={() => {
                if (selectedField)
              }}>
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th> */}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              <span role="img" aria-label="img">
                {product.category.icon}
              </span>{' '}
              - {product.category.title}
            </td>

            <td
              data-cy="ProductUser"
              className={cn({
                'has-text-link': product.user.sex === 'm',
                'has-text-danger': product.user.sex === 'f',
              })}
            >
              {product.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
