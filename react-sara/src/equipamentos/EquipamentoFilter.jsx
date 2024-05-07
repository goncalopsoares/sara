import React, { useState } from 'react';
import axios from 'axios';

const FilterForm = () => {
    const [marcaId, setMarcaId] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [subCategoriaId, setSubCategoriaId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.get('http://localhost:8000/api/equipamentos', {
            params: {
                marcaId,
                categoriaId,
                subCategoriaId
            }
        });

        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={marcaId} onChange={(e) => setMarcaId(e.target.value)}>
                <option value="">Select a brand</option>
                <option value="1">Canon</option>
                <option value="2">Sony</option>
            </select>

            <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                {/* Populate with your options */}
            </select>

            <select value={subCategoriaId} onChange={(e) => setSubCategoriaId(e.target.value)}>
                {/* Populate with your options */}
            </select>

            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default FilterForm;
