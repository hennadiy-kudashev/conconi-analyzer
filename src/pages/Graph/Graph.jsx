import React from 'react';
import Container from 'components/Container';
import { inject, observer } from 'mobx-react';
import Chart from 'components/Chart';
import Switcher from './Switcher';

@inject('lapsStore')
@observer
class Graph extends React.Component {
  state = {
    xAxis: 'speed'
  };

  handleSwitcherChange = value => {
    this.setState({
      xAxis: value
    });
  };

  getXAxisProp = () => {
    const { xAxis } = this.state;
    if (xAxis === 'speed') {
      return 'avg_speed';
    }
    if (xAxis === 'time') {
      return 'time';
    }
    throw new Error(`Stitch ${xAxis} is not supported`);
  };

  getLapStoreBy = dataPoint => {
    return this.props.lapsStore
      .getLaps()
      .find(
        lapStore =>
          lapStore.lap.get(this.getXAxisProp()) === dataPoint.x &&
          lapStore.lap.get('avg_hr') === dataPoint.y
      );
  };

  handleDataPointClick = dataPoint => {
    this.getLapStoreBy(dataPoint).toggle();
  };

  getTooltipByDataPoint = dataPoint => {
    const lapStore = this.getLapStoreBy(dataPoint);
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
  getXDomainRange = data => {
    if (data.length > 0) {
      return [data[0].x, data[data.length - 1].x];
    }
  };

  render() {
    const { lapsStore } = this.props;
    const data = lapsStore.getSelectedLaps().map(lapStore => ({
      x: lapStore.lap.get(this.getXAxisProp()),
      y: lapStore.lap.get('avg_hr')
    }));

    return (
      <Container>
        <h1 className="mt-5">Graph</h1>
        <p className="lead">Rendered based on selected laps.</p>
        <Chart
          data={data}
          axisLabels={{ x: 'Speed, km/h', y: 'HR, bpm' }}
          onDataPointClick={this.handleDataPointClick}
          getTooltipByDataPoint={this.getTooltipByDataPoint}
          xDomainRange={this.getXDomainRange(data)}
        />
        <Switcher onChange={this.handleSwitcherChange} />
      </Container>
    );
  }
}

export default Graph;
