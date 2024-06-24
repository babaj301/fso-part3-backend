const Filter = ({ input, handleInput }) => {
  return (
    <div>
      filter shown with <input value={input} onChange={handleInput} />
    </div>
  );
};

export default Filter;
