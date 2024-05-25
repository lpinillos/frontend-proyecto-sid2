import React, { useState,useEffect } from 'react'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPlans(searchTerm);
    };

    return (
        <>
            <form className="form-inline" onSubmit={handleSubmit}>
                <div className="form-group mb-2"></div>
                <div className="form-group mx-sm-3 mb-2">
                    <input
                        type="text"
                        name="word"
                        className="form-control"
                        id="word"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Digite el valor a buscar..."
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary mb-2" value="Buscar"></input>
            </form>
        </>
    )
}

export default SearchBar