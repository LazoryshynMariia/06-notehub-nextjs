import css from "./SearchBox.module.css";

interface SearchBoxProps {
    defaultValue: string;
    onSearch: (nextSearchQuery: string) => void;
}

export default function SearchBox({ defaultValue, onSearch }: SearchBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={defaultValue}
            onChange={handleChange}
        />
    );
}