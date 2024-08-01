export const Filters = ({ users, filterByUser }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a data-cy="FilterAllUsers" href="#/" onClick={() => filterByUser('all')}>
        All
      </a>
      {users.map(user => (
        <a
          data-cy="FilterUser"
          key={user.name}
          href="#/"
          onClick={() => filterByUser(user.name)}
        >
          {user.name}
        </a>
      ))}
      {/* <a data-cy="FilterUser" href="#/">
        User 1
      </a>

      <a data-cy="FilterUser" href="#/" className="is-active">
        User 2
      </a>

      <a data-cy="FilterUser" href="#/">
        User 3
      </a> */}
    </p>
  );
};
