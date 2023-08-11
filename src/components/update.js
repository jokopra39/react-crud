import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

export default function Update() {
    const headers = { 'Authorization': 'Bearer 43|DXSFxH0bVL6btmXFZy0j0PsZPgb57s0BWqiTkVpL' };
    let history = useHistory();
    const [id, setID] = useState(null);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const data = history.location.state.data;

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        // setNama(localStorage.getItem('nama'));
        // setEmail(localStorage.getItem('email'));
    }, []);

    const back = () => {
        history.push('/read')
    }

    const updateAPIData = () => {
        axios.post(`http://127.0.0.1:8000/api/update`, {
            id,
            nama,
            email
        },{headers}).then(() => {
            back()
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Nama</label>
                    <input placeholder='Nama' value={data.nama} onChange={(e) => setNama(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={data.email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Button className="btn-back" type='submit' onClick={back}><FaArrowLeft /></Button>
                <Button className="btn-save" type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}