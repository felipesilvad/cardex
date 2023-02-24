import React from 'react';
import { Container} from 'react-bootstrap';
import OPHomeNews from './News/OPHomeNews';

function OPHome() {

  return (
    <Container>
      <div>
        <OPHomeNews />
      </div>
    </Container>
  );
}

export default OPHome;