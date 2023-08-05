import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link, useHistory} from 'react-router-dom';

export default function Read() {
    let history = useHistory();
    const headers = { 'Authorization': 'Bearer 43|DXSFxH0bVL6btmXFZy0j0PsZPgb57s0BWqiTkVpL' };
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/mahasiswa`, { headers })
            .then((response) => {
                console.log(response.data.data)
                setAPIData(response.data.data);
            })
    }, []);

    const setData = (data) => {
        let { id, nama, email } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('nama', nama);
        localStorage.setItem('email', email);

    }

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/mahasiswa`, { headers })
            .then((getData) => {
                setAPIData(getData.data.data);
            })
    }

    const create = () => {
        history.push('/create')
    }

    const onDelete = (id) => {
        axios.post(`http://127.0.0.1:8000/api/delete`,  {
            id : id
          }, {headers})
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Button className="btn-create" type='submit' onClick={() => create()}>Create</Button>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nama</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.nama}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
