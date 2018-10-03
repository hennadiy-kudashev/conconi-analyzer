import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Container from 'components/Container';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import Laps from './Laps';
import './Files.css';

@inject('filesStore')
@observer
class Files extends React.Component {
  state = { activeTab: 0 };

  toggle = tabIndex => {
    this.setState({
      activeTab: tabIndex
    });
  };

  render() {
    const { filesStore } = this.props;
    const { activeTab } = this.state;
    return (
      <Container>
        <h1 className="mt-5">Laps</h1>
        <p className="lead">
          Select laps which you want to render on chart. By default laps
          selected which are within 150m - 250m range.
        </p>
        <Nav tabs>
          {filesStore.getFiles().map((fileStore, index) => (
            <NavItem key={`tab_${index}`}>
              <NavLink
                className={cx({ active: activeTab === index })}
                onClick={() => this.toggle(index)}
              >
                {fileStore.getName()}
                <span
                  onClick={() => filesStore.removeFile(fileStore.getName())}
                  className="file-remove-icon"
                >
                  &times;
                </span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {filesStore.getFiles().map((fileStore, index) => (
            <TabPane key={`tab_pane_${index}`} tabId={index}>
              <br />
              <Laps lapsStore={fileStore.getLaps()} />
            </TabPane>
          ))}
        </TabContent>
      </Container>
    );
  }
}

export default Files;
