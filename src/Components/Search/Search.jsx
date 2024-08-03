export const Search = ({ query, getQuery }) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={event => getQuery(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => getQuery('')}
          />
        </span>
      </p>
    </div>
  );
};
