import React from 'react';

interface ISearchInterface {
    onSearch: (val: string, newPage?: number) => Promise<void>
}

const Search = ({onSearch}: ISearchInterface) => {
    return (
        <header>
            <input type="search" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/>
        </header>
    )
}

export default Search;