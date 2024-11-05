const Filter = ({ searchTerm, handleSearchChange }) => (
    <div>
        Filter show with <input value={searchTerm} onChange={handleSearchChange} />
    </div>
);

export default Filter;