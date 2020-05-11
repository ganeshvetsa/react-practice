import React, {Component} from "react";
import Api from "./api/Api"
import "./Home.scss"
import {Link, withRouter} from "react-router-dom";

class Home extends Component {
  state = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countries: [],
    selectedCountry: "Global"
  }

  async componentDidMount() {

    let summary = await Api.getGlobalSummary();
    if (summary != null) {
      let {confirmed, deaths, recovered} = summary;
      this.setState({
        confirmed: confirmed.value,
        deaths: deaths.value,
        recovered: recovered.value
      });
    }
    let countries = await Api.getCountries();
    if (countries != null) {
      console.log(countries);
      this.setState({countries: countries});
    }

  }

  outer = (toggle) => {
    let prettyGirls = ['Keven Spacey', 'Dracula', 'Franklyn D. Roosevelt'];
    if (toggle) {
      prettyGirls.pop();
    }
    return function inner() {
      console.log(prettyGirls)
    };
  };

  onRowClick = (iso3) => {
    let country = this.state.countries.find(country => country.iso3 === iso3);
    console.log("country:", country);
    let plusplus = this.adder(1);
    console.log(plusplus(41)); // -> 42
    let decr = this.adder(-1);
    console.log(decr(8)); // -> 7

    let inner = this.outer();
    inner(); // ['Keven Spacey', 'Dracula', 'Franklyn D. Roosevelt'];
    let inner2 = this.outer(true);
    inner2(); // ['Keven Spacey', 'Dracula', 'Franklyn D. Roosevelt', 'Jean-Luc Picard']
  };

  adder = (step) => {
    return (value) => {
      return value + step;
    };
  };

  onCountryChange = (e) => {
    console.log(e);
    console.log(e.target);
    this.setState({selectedCountry: e.target.value})
  };

  // renderSelect = () => {
  //   return (<select value={this.state.selectedCountry}
  //                   onChange={this.onCountryChange}>
  //     <option value={"Global"}>Global</option>
  //     {this.state.countries.map((country, i) => {
  //       // console.log(country.iso3);
  //       return <option key={i} value={country.iso3}>{country.name}</option>
  //     })}
  //   </select>);
  // };

  renderTableData() {
    let {url} = this.props.match;
    return this.state.countries.map((country, index) => {
      const {iso3, name} = country;
      return (
          <tr key={index}>
            <td>{index}</td>
            <td>{iso3}</td>
            <td onClick={() => {
              this.onRowClick(iso3)
            }}><Link to={`${url}/countries/${iso3}`}> {name}</Link></td>
          </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.countries[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTable = () => {
    return <div>
      <h1 id='title'>React Dynamic Table</h1>
      <table className='countries'>
        <tbody>
        {this.state.countries.length > 0 && <tr>{this.renderTableHeader()}</tr>}
        {this.renderTableData()}
        </tbody>
      </table>
    </div>

  }

  render() {
    console.log("countries", this.state.countries.length);
    return <div id={"home"}>
      <div className={"summary"}>
        <div className={"confirmed"}>
          <label>Confirmed</label>
          <label>{this.state.confirmed}</label>
        </div>
        <div className={"recovered"}>
          <label>Recovered</label>
          <label>{this.state.recovered}</label>
        </div>
        <div className={"deaths"}>
          <label>Deaths</label>
          <label>{this.state.deaths}</label>
        </div>
      </div>
      <div className={"countries-section"}>
        {this.renderTable()}
      </div>
    </div>
  }

}

export default withRouter(Home);