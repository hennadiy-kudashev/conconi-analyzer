import React from 'react';
import ReactDOM from 'react-dom';
import LineChart from 'react-easy-chart/lib/line-chart';
import Legend from 'react-easy-chart/lib/legend';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';

const lineColors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf'
];

class Chart extends React.Component {
  state = {
    componentWidth: 1000,
    showToolTip: false,
    dataPointEl: ''
  };

  getWidth() {
    return ReactDOM.findDOMNode(this).clientWidth;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      componentWidth: this.getWidth()
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ componentWidth: this.getWidth() });
  }

  mouseOverHandler = (d, e) => {
    this.setState({
      showToolTip: true,
      dataPointEl: e.toElement,
      dataPoint: d
    });
  };

  mouseOutHandler = () => {
    this.setState({ showToolTip: false });
  };

  renderTooltip() {
    if (this.state.showToolTip) {
      const { header, body: TooltipBody } = this.props.getTooltipByDataPoint(
        this.state.dataPoint
      );
      return (
        <Popover
          placement="bottom"
          isOpen={this.state.showToolTip}
          target={this.state.dataPointEl}
        >
          <PopoverHeader>{header}</PopoverHeader>
          <PopoverBody>
            <TooltipBody />
          </PopoverBody>
        </Popover>
      );
    }
    return null;
  }

  render() {
    const {
      data,
      onDataPointClick,
      axisLabels,
      xDomainRange,
      legend
    } = this.props;
    return (
      <div>
        {this.renderTooltip()}
        <LineChart
          style={{
            '.label': { fill: 'black' },
            '.domain': { stroke: 'white' },
            '.data-point': { stroke: 'rgb(63, 76, 85) !important' }
          }}
          axes
          dataPoints
          clickHandler={onDataPointClick}
          axisLabels={axisLabels}
          lineColors={lineColors}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
          mouseMoveHandler={this.mouseMoveHandler}
          width={this.state.componentWidth}
          height={this.state.componentWidth / 2}
          interpolate={'cardinal'}
          data={data}
          grid
          verticalGrid
          xDomainRange={xDomainRange}
        />
        <Legend
          data={legend}
          dataId="name"
          horizontal
          config={lineColors.map(color => ({ color }))}
        />
      </div>
    );
  }
}

export default Chart;
