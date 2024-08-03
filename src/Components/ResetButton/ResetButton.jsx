export const ResetButton = ({ makeAllClear }) => {
  return (
    <div className="panel-block">
      <a
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
        onClick={() => makeAllClear()}
      >
        Reset all filters
      </a>
    </div>
  );
};
