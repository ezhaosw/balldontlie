import React, { useState, ChangeEvent } from 'react';

interface Props {
    addSearch: Function;
}

export default function Search(props:Props) {

    const [name, setName] = useState('');

    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        props.addSearch(name);

    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const tar = e.target;
        setName(tar.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-search-input" className="search-label">
                Search by Team ID
            </label>
            </h2>
            <input
                type="text"
                id="new-search-input"
                className="input search-input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-search">
            Search
            </button>
        </form>
    )
}