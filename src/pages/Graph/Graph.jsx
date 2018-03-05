import React from 'react';
import Container from 'components/Container';
import { inject, observer } from 'mobx-react';

const Graph = inject('lapsStore')(
  observer(({ lapsStore }) => {
    return (
      <Container>
        <h1 className="mt-5">Graph</h1>
        <p className="lead">Rendered based on selected laps.</p>
        {JSON.stringify(lapsStore.getSelectedLaps())}
      </Container>
    );
  })
);

export default Graph;
