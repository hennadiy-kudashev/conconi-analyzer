import React from 'react';
import { Table } from 'reactstrap';
import Container from 'components/Container';

const Laps = () => {
  return (
    <Container>
      <h1 className="mt-5">Laps</h1>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Lap #</th>
            <th>Distance (m)</th>
            <th>Time (sec)</th>
            <th>AHR (bpm)</th>
            <th>Speed (km/h)</th>
            <th>Pace (min/km)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>23</td>
            <td>34</td>
            <td>123</td>
            <td>234</td>
            <td>34.5</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Laps;
