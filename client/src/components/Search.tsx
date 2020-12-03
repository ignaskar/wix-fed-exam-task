import React, { SetStateAction } from 'react';

interface ISearchInterface {
    setSearch: React.Dispatch<SetStateAction<string>>;
    setPageIndex: React.Dispatch<SetStateAction<number>>;
}

const Search = ({ setSearch, setPageIndex }: ISearchInterface) => {
    let searchDebounce: any = null;

    const onSearch = async (val: string, newPage?: number) => {
        clearTimeout(searchDebounce);

        searchDebounce = setTimeout(async () => {
            setPageIndex(1);
            setSearch(val);
        }, 300);
    };

    return (
        <header>
            <input
                type="search"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </header>
    );
};

export default Search;
