import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import SuccessfullLaunch from './Component/SuccessfullLaunch';
import querystring from 'querystring';
import './App.css';
import loader from './loadRocket.gif';
// import background from './header-background.jpg';

const API_BASE_URL = "https://api.spaceXdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }


  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="loader-container">
        <div className="loader">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="header">Space-X Launch</h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className="filter-card">
                  <Card.Body>
                    <Card.Title className="filter-header">
                      Filters
                    </Card.Title>
                    <Card.Text className="filter-launch-year">
                      Launch Year
                      <hr className="filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="filter-container">
                        {uniqueLaunchYears.map((year) => {
                          return (
                            <Button
                              className="filter-button"
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters("launch_year", e.target.value)
                              }
                            >
                              {year}
                            </Button>
                          );
                        })}
                      </div>
                    </Row>

                    <Card.Text className="filter-heading">
                      Successful Launch
                      <hr className="filters-hr" />
                    </Card.Text>

                    <div className="filter-container">
                      <Button
                        className="filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("launch_success", e.target.value)
                        }
                        value="true"
                      >
                        Success
                      </Button>

                      <Button
                        className="filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("launch_success", e.target.value)
                        }
                        value="false"
                      >
                        Failure
                      </Button>
                    </div>

                    <Card.Text className="filter-heading">
                      Successful Landing
                      <hr className="filters-hr" />
                    </Card.Text>
                    <div className="filter-container">
                      <Button
                        className="filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        Success
                      </Button>

                      <Button
                        className="filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        Failure
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map((rocketdetail) => {
                    return (
                      <Col md={12} lg={4}>
                        <SuccessfullLaunch rocketdetail={rocketdetail} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <div>
              <h5 className="creator-name">
                Created by: Shivaraj Loni  
              </h5>
            </div>
          </Container>
        </div>
      );
    }

  }
}

export default App;
