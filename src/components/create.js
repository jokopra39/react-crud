import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export default function Create() {
  let history = useHistory();
  const headers = {
    Authorization: "Bearer 43|DXSFxH0bVL6btmXFZy0j0PsZPgb57s0BWqiTkVpL",
  };
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const postData = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/mahasiswa`,
        {
          nama,
          email,
        },
        { headers: headers }
      )
      .then(() => {
        back();
      });
  };
  const back = () => {
    history.push("/read");
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Nama</label>
          <input placeholder="Nama" onChange={(e) => setNama(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Button className="btn-back" type="submit" onClick={back}>
          <FaArrowLeft />
        </Button>
        <Button className="btn-save" onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
