const PersonDisplay = ({ filtered, handleDelete }) => {
  return (
    <div>
      {filtered.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
            <button id={person.id} onClick={handleDelete}>
              Delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default PersonDisplay;
