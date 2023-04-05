import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { suggestion } from '../../autosuggestion';
import './form.css'

function Formss({ setSuggestedName, searchquery, setSearchQuery, suggestedname, handleSuggestionClick, id, key, name, email, date, select, handleDeleteField, handleAddField, handleFieldChange }) {
    const [validated, setValidated] = useState(false);
    const disabledDate = [date];

    const findsuggestionwithQuery = (query) => {
        return new Promise((resolve) => {
            const matchingsuggestion = suggestion.filter((name) =>
                name.includes(query.toLowerCase())
            ).map((name) => name);
            setTimeout(() => {
                resolve(matchingsuggestion);
            }, 200);
        });
    };

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidated(true);
    // };

    const onQueryChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const suggesteddata = findsuggestionwithQuery(searchquery)
        suggesteddata.then((data) => {
            setSuggestedName(data)
        })
    };

    return (
        <Form noValidate validated={validated}>
            <div className='form-field-container'>
                <div className='form-fields'>

                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Control
                            required
                            type="text"
                            name='name'
                            placeholder="First name"
                            value={searchquery}
                            onChange={onQueryChange}
                        />
                        <div className='suggest-result'>
                            <div className={`resultss ${searchquery ? 'd-block' : 'd-hidden'}`}>
                                {searchquery && suggestedname?.map((name, id) => (
                                    <div key={id} className='list-result'>
                                        <span onClick={() => handleSuggestionClick(name)}>{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Control
                            required
                            type="email"
                            placeholder="type email"
                            name='email'
                            value={email}
                            onChange={(e) => handleFieldChange(id, 'email', e.target.value)}
                            className='form-filed'
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Select value={select} onChange={(e) => handleFieldChange(id, 'selects', e.target.value)} name='selects' className='form-filed' required aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>

                    <Form.Group as={Col} controlId="validationCustom02">
                        <DatePicker name='dates' className='form-filed date-field' required selected={date} onChange={(date) => handleFieldChange(id, 'dates', date)} excludeDates={disabledDate} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                </div>

                <div className='icon-btn'>
                    <span className='iconss' onClick={handleAddField}>
                        <img src='/plus.png' className='icon' alt='plus' />
                    </span>
                    <span className='iconss' onClick={() => handleDeleteField(id)}>
                        <img src='/minus.png' className='icon' alt='minus' />
                    </span>
                </div>
            </div>
        </Form>
    )
}

export default Formss;



