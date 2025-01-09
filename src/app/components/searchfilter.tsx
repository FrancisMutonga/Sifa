import Image from 'next/image';

interface SearchFilterProps {
  categories: { name: string; icon: string }[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-4">
      <select
        className="border p-2"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.name} value={category.name}>
              <div className="inline-flex items-center">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {category.name}
              </div>
            </option>
          ))
        ) : null} {/* No "No categories available" message */}
      </select>
    </div>
  );
};

export default SearchFilter;
