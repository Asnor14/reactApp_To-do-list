function FilterButtons({ currentFilter, onFilterChange, todosCount }) {
  const filters = [
    { key: 'all', label: 'All', count: todosCount.all },
    { key: 'active', label: 'Active', count: todosCount.active },
    { key: 'completed', label: 'Completed', count: todosCount.completed }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
          <span className="filter-count">({filter.count})</span>
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
