import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container, ButtonContainer, PointReference } from "./styles";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";

import { withRouter } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import { logout } from '../../services/auth';

import debounce from 'lodash/debounce';
import api from '../../services/api';

import Button from './components/Button';
import Properties from './components/Properties/index';
import AddProperty from '../AddProperty'
import Property from '../Property'

const TOKEN =
  "pk.eyJ1IjoiZG91Z2xhcy1kcyIsImEiOiJjazA2dnVxaGQwZXpoM2lxYmIxc2VqZGdtIn0.XQ5faRbBWkYmLjJaNdF-6w";

class Map extends Component {

    constructor() {
        super();

        this.state = {
          viewport: {
            latitude: -27.2108001,
            longitude: -49.6446024,
            zoom: 12.8,
            bearing: 0,
            pitch: 0
          },
          properties: [],
          addActivate: false
        };

        this.updatePropertiesLocalization = debounce(
            this.updatePropertiesLocalization, 
            500
        );
    }

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  componentDidMount() {
      this.loadProperties();
  }

  updatePropertiesLocalization() {
      this.loadProperties();
  }

  loadProperties = async () => {
      const { latitude, longitude } = this.state.viewport;
      try {
          const response = await api.get('/properties', {
              params: { latitude, longitude }
          });
          this.setState({ properties: response.data });
      } catch(err) {
          console.log(err);
      }
  };

  handleLogout = e => {
      logout();
      this.props.history.push('/');
  }

  handleAddProperty = () => {
    const { match, history } = this.props;
    const { latitude, longitude } = this.state.viewport;
    history.push(
      `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
    );
    this.setState({ addActivate: false });
  }

  renderActions() {
      return (

        <ButtonContainer>

          <Button 
            color="#fc6963" 
            onClick={() => this.setState({ addActivate: true })}
          >
            <i className="fa fa-plus"/>
          </Button>

          <Button color="#222" onClick={this.handleLogout}>
            <i className="fa fa-times" />
          </Button>

        </ButtonContainer>
      );
  }

  renderButtonAdd() {
    return (
      this.state.addActivate && (
        <PointReference>
          <i className="fa fa-map-marker" />
          <div>
            <button onClick={this.handleAddProperty} type="button">
              Adicionar
            </button>
            <button 
              onClick={() => this.setState({ addActivate: false })} 
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </PointReference>
      )
    )
  }

  render() {
      const { containerWidth: width, containerHeight: height, match } = this.props;
      const { properties, addActivate } = this.state;
      return (
          <>
               <MapGL
                    width={width}
                    height={height}
                    {...this.state.viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={TOKEN}
                    onViewportChange={viewport => this.setState({ viewport })}
                    onViewStateChange={this.updatePropertiesLocalization.bind(this)}
                >
                    <Properties properties={properties} />
                    {!addActivate && <Properties match={match} properties={properties} />}
                </MapGL>
                {this.renderActions()}
                {this.renderButtonAdd()}

                <ModalRoute 
                  path={`${match.url}/properties/add`}
                  parentPath={match.url}
                  component={AddProperty}
                />
                
                <ModalRoute 
                  path={`${match.url}/property/:id`}
                  parentPath={match.url}
                  component={Property}
                />
          </>
    );
  }

}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;