import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function OPSearchSelect({options, reloadFilter}) {

  return (
    <Form.Select className='search-select' id="select"
    onfocus='this.size=10;' onblur='this.size=0;' onchange='this.size=1; this.blur();'
      onChange={e => reloadFilter(e.target.value)}
      defaultValue={{label: "Any", value: 'Any'}}
    >
      {options.map((option) => (
        <option className='search-select-option' 
        value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
}

export default OPSearchSelect;