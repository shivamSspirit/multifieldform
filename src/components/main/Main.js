import React, { useState } from 'react'
import Form from '../form/Form'
import './main.css'


function Main() {
    const [fields, setFields] = useState([{ id: 0, name: '', email: '', dates: new Date(), selects: '' }]);
    const [nextId, setNextId] = useState(1);
    const [searchquery, setSearchQuery] = useState('');
    const [suggestedname, setSuggestedName] = useState();


    const getformatdate = (date) => {
        let inputDate = date;
        let dateObj = new Date(inputDate);
        let day = ("0" + dateObj.getDate()).slice(-2);
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        let year = dateObj.getFullYear();
        let formattedDate = day + "/" + month + "/" + year;
        return formattedDate
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestedName([]);
    };


    const handleFieldChange = (id, name, value) => {
        const updatedFields = fields.map(field => {
            if (field.id === id) {
                return { ...field, [name]: value };
            }
            return field;
        });
        setFields(updatedFields);
    };



    const handleAddField = () => {
        setFields([...fields, { id: nextId, name: '', email: '', dates: new Date(), selects: '' }]);
        setNextId(nextId + 1);
    };

    const handleDeleteField = (id) => {
        if (id === 0) {
            return;
        }
        setFields(fields.filter(field => field.id !== id));
    };

    const renderFields = () => {
        return fields.map(field => (
            <Form
                key={field.id}
                id={field.id}
                name={field.name}
                email={field.email}
                date={field.dates}
                select={field.selects}
                handleDeleteField={handleDeleteField}
                handleAddField={handleAddField}
                handleFieldChange={handleFieldChange}
                handleSuggestionClick={handleSuggestionClick}
                suggestedname={suggestedname}
                searchquery={searchquery}
                setSearchQuery={setSearchQuery}
                setSuggestedName={setSuggestedName}
            />
        ));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("fields", fields)
    }

    return (
        <div className='main-container'>
            {renderFields()}
            <div className='btn-container'>
                <button onClick={onSubmit} className='submit-btn'>Submit</button>
            </div>
        </div>
    )
}

export default Main
