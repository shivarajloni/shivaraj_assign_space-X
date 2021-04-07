import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import SuccessfullLaunch from './components/SuccessfullLaunch';
import querystring from 'querystring';
import './App.css';
import loader from './loadRocket.gif';

const API_BASE_URL = "https://api.spaceXdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">Space-X Launch </h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      Filters
                    </Card.Title>
                    <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filters-hr" />
                    </Card.Text>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={4}>
                        <SuccessfullLaunch details={details} />
                      </Col>
                    );
                  })}
                </Row>
            <div>
              <h5 className="App-Developers-name">
                Created by: Shivaraj Loni  
              </h5>
            </div>
      );
    }

export default App;
