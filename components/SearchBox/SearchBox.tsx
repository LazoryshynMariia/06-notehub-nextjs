import css from "./SearchBox.module.css";

interface SearchBoxProps {
    text: string;
    onSearch: (nextSearchQuery: string) => void;
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={text}
            onChange={handleChange}
        />
    );
}