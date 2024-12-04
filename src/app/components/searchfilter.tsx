interface SearchFilterProps {
  categories: { name: string; icon: string }[];  // Receive categories as props
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  console.log("SearchFilter Categories:", categories); // Debug: log categories

  return (
    <div className="mb-4">
      <select
        className="border p-2"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.name} value={category.name}>
              <img src={category.icon} alt={category.name} className="w-5 h-5 inline mr-2" />
              {category.name}
            </option>
          ))
        ) : (
          <option>No categories available</option>
        )}
      </select>
    </div>
  );
};

export default SearchFilter;
