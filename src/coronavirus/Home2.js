import React, {Component} from "react";
import Api from "./api/Api";
import "./Home2.scss"

class Home2 extends Component {
  state = {
    countries: []
  };

  async componentDidMount() {
    let data = await Api.getCountries();
    this.setState({countries: data});
  }

  onCountryClick(index, iso3) {
    let country = this.state.countries[index];
    console.log(country);
    let country2 = this.state.countries.find(country => country.iso3 === iso3)
    console.log(country2);
  }

  renderCountries() {
    return <div className={"countries"}>
      <h1>Cases by country</h1>
      <table>
        <tbody>
        {this.renderHeader()}
        {this.renderBody()}
        </tbody>
      </table>
    </div>
  }

  renderHeader() {
    let headers = Object.keys(this.state.countries[0]);
    console.log(headers);
    return <tr>
      {headers && headers.map((header) => {
        return <th key={header}>{header}</th>
      })}
    </tr>
  }

  renderBody() {
    return this.state.countries.map((country, index) => {
      let {iso3, name} = country;
      return <tr key={index}>
        <td>{index}</td>
        <td>{iso3}</td>
        <td onClick={() => {
          this.onCountryClick(index, iso3);
        }}>{name}</td>
      </tr>
    })
  }

  render() {
    return <div id="home2">
      {this.state.countries.length > 0 && this.renderCountries()}
    </div>
  }
}

export default Home2;