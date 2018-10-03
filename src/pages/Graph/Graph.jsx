import React from 'react';
import Container from 'components/Container';
import { inject, observer } from 'mobx-react';
import Chart from 'components/Chart';
import Switcher from './Switcher';

@inject('filesStore')
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
    for (const fileStore of this.props.filesStore.getFiles()) {
      const store = fileStore
        .getLaps()
        .getLaps()
        .find(
          lapStore =>
            lapStore.lap.get(this.getXAxisProp()) === dataPoint.x &&
            lapStore.lap.get('avg_hr') === dataPoint.y
        );
      if (store) return store;
    }
  };

  handleDataPointClick = dataPoint => {
    this.getLapStoreBy(dataPoint).toggle();
  };

  getTooltipByDataPoint = dataPoint => {
    const lapStore = this.getLapStoreBy(dataPoint);
    return {
      header: `Lap ${lapStore.lap.get('index')}`,
      body: () => (
        <div>
          <ul>
            <li>HeardRate: {lapStore.lap.get('avg_hr')} bpm</li>
            <li>Speed: {lapStore.lap.get('avg_speed')} km/h</li>
            <li>Distance: {lapStore.lap.get('distance')} m</li>
            <li>Time: {lapStore.lap.get('time')} sec</li>
            <li>Pace: {lapStore.lap.get('avg_pace')} min/km</li>
          </ul>
          <i>Click to remove this point.</i>
        </div>
      )
    };
  };
  getXDomainRange = data => {
    if (data.length > 0) {
      return [data[0].x, data[data.length - 1].x];
    }
  };

  getXAxisLabel = () => {
    const { xAxis } = this.state;
    if (xAxis === 'speed') {
      return 'Speed, km/h';
    }
    if (xAxis === 'time') {
      return 'Time, sec';
    }
    throw new Error(`Stitch ${xAxis} is not supported`);
  };

  render() {
    const { filesStore } = this.props;
    const data = filesStore.getFiles().map(fileStore =>
      fileStore
        .getLaps()
        .getSelectedLaps()
        .map(lapStore => ({
          x: lapStore.lap.get(this.getXAxisProp()),
          y: lapStore.lap.get('avg_hr')
        }))
    );
    const legend = filesStore
      .getFiles()
      .map(fileStore => ({ name: fileStore.getName() }));

    return (
      <Container>
        <h1 className="mt-5">Graph</h1>
        <p className="lead">Rendered based on selected laps.</p>
        <Switcher onChange={this.handleSwitcherChange} />
        <Chart
          data={data}
          axisLabels={{ x: this.getXAxisLabel(), y: 'HR, bpm' }}
          onDataPointClick={this.handleDataPointClick}
          getTooltipByDataPoint={this.getTooltipByDataPoint}
          legend={legend}
          /*xDomainRange={this.getXDomainRange(data)}*/
        />
        <br />
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

export default Graph;
