import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Read() {
  const MySwal = withReactContent(Swal);
  let history = useHistory();
  const headers = {
    Authorization: "Bearer 43|DXSFxH0bVL6btmXFZy0j0PsZPgb57s0BWqiTkVpL",
  };
  const [APIData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  function Car(data) {
    return (
      <div>
        <button className="btn-action" onClick={() => setData(data)}>
          <FaEdit />
        </button>
        <button onClick={() => onDelete(data.id)} className="btn-action">
          <FaTrash />
        </button>
      </div>
    );
  }

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      cell: (data) => Car(data),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const setData = (data) => {
    // let { id, nama, email } = data;
    // localStorage.setItem("ID", id);
    // localStorage.setItem("nama", nama);
    // localStorage.setItem("email", email);
    history.push("/update",{data: data});
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/mahasiswa`, { headers })
      .then((getData) => {
        setAPIData(getData.data.data);
        setLoading(false);
      });
  };

  const create = () => {
    history.push("/create");
  };

  const onDelete = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/delete`,
        {
          id: id,
        },
        { headers }
      )
      .then(() => {
        MySwal.fire({
          title: <p>Success</p>,
          html: <i>Data success deleted!</i>,
          icon: "success",
        });
        getData();
      });
  };

  return (
    <div>
      <Button className="btn-create" type="submit" onClick={() => create()}>
        Create
      </Button>
      <DataTable
        data={APIData}
        columns={columns}
        pagination
        progressPending={loading}
        dense
      />
    </div>
  );
}
