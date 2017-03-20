import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Logo from 'grommet/components/icons/Grommet';
import Meter from 'grommet/components/Meter';
import LinkNext from 'grommet/components/icons/base/LinkNext';
import Distribution from 'grommet/components/Distribution';
import Chart,
  { Layers, Base, Area, Axis } from 'grommet/components/chart/Chart';

import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from './utils';

class Login extends Component {

  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Login');
    this.props.dispatch(navEnable(false));
  }

  componentWillUnmount() {
    this.props.dispatch(navEnable(true));
  }

  _onSubmit(fields) {
    const { dispatch } = this.props;
    dispatch(login(fields.username, fields.password, '/dashboard'));
  }

  render() {
    const { session: { error } } = this.props;

    return (
      <Box className="dashboard" justify="center" align="center" full={true}
        pad="large" colorIndex="grey-2">
        <Box className="infographic-start" direction="column">
          <Box justify="center" align="start">
            <Box direction="row">
              <Headline size="medium" strong={true}>
                Watson Discovery - Review Miner
              </Headline>
            </Box>
            <Box direction="column">
              
            </Box>
          </Box>

          <Box justify="start" className="infographic-stat" 
            responsive={false} direction="row" style={{padding:'20px 0'}}>
              <Box direction="column">
              <Heading tag="h4" strong={true} margin="none">
                Analyzing thousands
              </Heading>
              <Heading tag="h3">
                of hotel reviews to drive business decisions.
                </Heading>
              </Box>
          </Box>
        </Box>
        <Box className="stacked-row" direction="row" pad={{vertical:"medium"}}>
          <Box className="meter-box col__span-25" justify="start" 
            pad={{horizontal:"medium"}} align="center">
            <Box>
              <Heading tag="h4" strong={true}>
                Review Breakdown
              </Heading>

              <Meter type='circle'
                series={[{"label": "2003", "value": 5}, {"label": "2004", "value": 86}, {"label": "2005", "value": 153}, {"label": "2006", "value": 202}, {"label": "2007", "value": 231}, {"label": "2008", "value": 342}, {"label": "2009", "value": 406}]}
                stacked={true}
                size='small' />
            </Box>
            <Box>
              <Heading tag="h4" strong={true}>
                Review Breakdown
              </Heading>

              <Distribution series={[{"label": "First", "value": 40, "colorIndex": "graph-1"}, {"label": "Second", "value": 30, "colorIndex": "accent-2"}, {"label": "Third", "value": 20, "colorIndex": "unset"}, {"label": "Fourth", "value": 10, "colorIndex": "graph-1"}]} />
            </Box>
          </Box>
          <Box className="area-box col__span-25" justify="start" 
            pad={{horizontal:"medium"}} align="center">
            <Box>
              <Heading tag="h4" strong={true}>
                Alleton Hotel (Chicago)
              </Heading>
              <Heading tag="h5">
                Review Sentiment by Year
              </Heading>
              <Chart>
                <Axis vertical={true}
                  count={3}
                  ticks={true}
                  max={1}
                  />
                <Base />
                <Layers>
                  <Area values={[47.47981263157895,
        7.553482307692308,
        32.11255518518519,
        19.947411309090904,
        15.336217692307694,
        27.54325246376812]} />
                </Layers>
                <Axis count={2}
                  // labels={[{"index": 0, "label": "2004"}, {"index": 1, "label": "2005"}, {"index": 2, "label": "2006"}, {"index": 3, "label": "2007"}, {"index": 4, "label": "2008"}, {"index": 5, "label": "2009"}]} />
                  labels={[{"index": 0, "label": "2004"}, {"index": 1, "label": "2009"}]} />
              </Chart>
            </Box>
          </Box>
          <Box className="map-box col__span-50" justify="start" 
            pad={{horizontal:"medium"}} align="center">
            <Box align="start" direction="row" responsive={false}>
              <Heading tag="h3">
                <b>Most Positive Review:</b> 60 Thompson (New York)
              </Heading>
            </Box>
            <Box align="start" direction="row" responsive={false}>
              <Paragraph>
                <b>Fabulous Upgrade and Great stay in a good NY location:</b> Arrived Tuesday 16th for a 3 night stay, I had booked what i thought was a good deal via Quickbook for a studio suite worked out at $203+taxes, i was to very pleasantly suprised to be upgraded to a huge duplex loft suite...
              </Paragraph>
            </Box>
            <Box align="start" direction="row" responsive={false}>
              <Heading tag="h3">
                <b>Most Negative Review:</b> Allerton (Chicago)
              </Heading>
            </Box>
            <Box align="start" direction="row" responsive={false}>
              <Paragraph>
                <b>Dismal Service:</b> You can't beat the Allerton for location, but even a Motel Six beats it for customer service (or at least the service I received). When I arrived, for a business trip, the distracted and seemingly unhappy desk clerk put me in a terrible room, tucked behind the elevator...
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const select = state => ({
  session: state.session
});

export default connect(select)(Login);
