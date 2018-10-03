import React from 'react';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';

const Laps = observer(({ lapsStore }) => {
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Lap #</th>
          <th>Distance (m)</th>
          <th>Time (sec)</th>
          <th>AHR (bpm)</th>
          <th>Speed (km/h)</th>
          <th>Pace (min/km)</th>
          <th>Selected</th>
        </tr>
      </thead>
      <tbody>
        {lapsStore.getLaps().map(lapStore => (
          <tr key={lapStore.lap.name} onClick={() => lapStore.toggle()}>
            <th scope="row">{lapStore.lap.get('index')}</th>
            <td>{lapStore.lap.get('distance')}</td>
            <td>{lapStore.lap.get('time')}</td>
            <td>{lapStore.lap.get('avg_hr')}</td>
            <td>{lapStore.lap.get('avg_speed')}</td>
            <td>{lapStore.lap.get('avg_pace')}</td>
            <td>
              <input
                type="checkbox"
                checked={lapStore.lap.get('selected')}
                readOnly
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default Laps;
