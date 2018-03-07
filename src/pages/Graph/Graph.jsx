import React from 'react';
import Container from 'components/Container';
import { inject, observer } from 'mobx-react';
import Chart from 'components/Chart';

const Graph = inject('lapsStore')(
  observer(({ lapsStore }) => {
    const data = lapsStore.getSelectedLaps().map(lapStore => ({
      x: lapStore.lap.get('avg_speed'),
      y: lapStore.lap.get('avg_hr')
    }));
    const getLapStoreBy = dataPoint =>
      lapsStore
        .getLaps()
        .find(
          lapStore =>
            lapStore.lap.get('avg_speed') === dataPoint.x &&
            lapStore.lap.get('avg_hr') === dataPoint.y
        );
    const handleDataPointClick = dataPoint => {
      getLapStoreBy(dataPoint).toggle();
    };
    const getTooltipByDataPoint = dataPoint => {
      const lapStore = getLapStoreBy(dataPoint);
      return {
        header: `Lap ${lapStore.lap.get('index')}`,
        body: () => (
          <ul>
            <li>HeardRate: {lapStore.lap.get('avg_hr')} bpm</li>
            <li>Speed: {lapStore.lap.get('avg_speed')} km/h</li>
            <li>Distance: {lapStore.lap.get('distance')} m</li>
            <li>Time: {lapStore.lap.get('time')} sec</li>
            <li>Pace: {lapStore.lap.get('avg_pace')} min/km</li>
          </ul>
        )
      };
    };
    return (
      <Container>
        <h1 className="mt-5">Graph</h1>
        <p className="lead">Rendered based on selected laps.</p>
        <Chart
          data={data}
          onDataPointClick={handleDataPointClick}
          getTooltipByDataPoint={getTooltipByDataPoint}
        />
      </Container>
    );
  })
);

export default Graph;
