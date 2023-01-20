import React from 'react';
import Form from 'react-bootstrap/Form';

function OPSearchSelect({options, reloadFilter, id}) {

  return (
    <Form.Select className='search-select' 
      id={(id) ? (id) : ("select")}
      onChange={e => reloadFilter(e.target.value)}
    >
      {options.map((option, i) => (
        <option key={i} className='search-select-option' 
        value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
}

export default OPSearchSelect;