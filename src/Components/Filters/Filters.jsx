import cn from 'classnames';

export const Filters = ({ users, selectedUser, filterByUser }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => filterByUser(null)}
        className={cn({ 'is-active': !selectedUser })}
      >
        All
      </a>
      {users.map(user => (
        <a
          data-cy="FilterUser"
          key={user.name}
          href="#/"
          onClick={() => filterByUser(user.name)}
          className={cn({ 'is-active': selectedUser === user.name })}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
