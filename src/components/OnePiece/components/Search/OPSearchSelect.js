import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function OPSearchSelect({options, reloadFilter}) {

  return (
    <Form.Select className='search-select' id="select"
      onChange={e => reloadFilter(e.target.value)}
      defaultValue={{label: "Any", value: 'Any'}}
    >
      {options.map((option, i) => (
        <option key={i} className='search-select-option' 
        value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
}

export default OPSearchSelect;