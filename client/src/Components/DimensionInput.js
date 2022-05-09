import React from "react";

import { Form } from "react-bootstrap";

export default function DimensionInput({ axis, handler, value }) {
  const label = axis.charAt(0).toUpperCase() + axis.slice(1) + ":";

  return (
    <>
      <Form.Group className="mb-2 mt-2 d-flex" controlId="selectheight">
        <Form.Label className="my-auto me-2">
          <h5 className="my-auto">{label}</h5>
        </Form.Label>
        <Form.Select
          aria-label={`select ${axis}`}
          onChange={(e) => {
            handler(e.target.value);
          }}
          value={value}
        >
          <option value={undefined}>{`Select ${axis}`}</option>
          <option value="200">200 px</option>
          <option value="300">300 px</option>
          <option value="400">400 px</option>
          <option value="500">500 px</option>
          <option value="600">600 px</option>
          <option value="700">700 px</option>
          <option value="800">800 px</option>
          <option value="900">900 px</option>
          <option value="1000">1000 px</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}
