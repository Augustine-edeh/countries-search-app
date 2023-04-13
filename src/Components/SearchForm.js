import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//  IMPORTING THE CountryInfo CONTEXT
import CountryInfoContext from "../CountryInfoContext/CountryInfoContext";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [countryValue, setcountryValue] = useState("");

  // IMPORTING THE updateCountryInfo UPDATER FUNCTION
  const { updateCountryInfo } = useContext(CountryInfoContext);

  const [isSearchInputEmpty, setIsSearchInputEmpty] = useState();

  const changeHandler = (event) => {
    setcountryValue(event.target.value);
  };
  // ASSIGNING THE useNavugate HOOK
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    // CHEECKING IF countryValue IS NOT EMPTY
    if (!!countryValue) {
      // SETTING isSearchInputEmpty TO FALSE
      setIsSearchInputEmpty((previous) => false);

      // console.log("Fetching country Data...");

      const countryURL = `https://restcountries.com/v3.1/name/${countryValue.trim()}`;
      fetch(countryURL)
        .then((response) => {
          // Checking if response status is successful
          if (!response.ok) {
            // Throwing error if response status is not successful
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((countryData) => {
          if (countryData.length > 1) {
            countryData = countryData.filter(
              (country) =>
                country.name.common.toLocaleLowerCase() ===
                countryValue.toLocaleLowerCase()
            );
          }
          // UPDATING THE countryInfo CONTEXT
          updateCountryInfo(countryData);
          // PROGRAMMATICALLY NAVIGATING TO THE RESULT PAGE
          navigate("/countries-search-app/country");
        })
        .catch((error) => {
          if (error.message === "Not Found") {
            // If the country searched for is not correct/Not Found
            console.log(`Country not found!`);
          }
        });
    } else {
      setIsSearchInputEmpty(true);
      // FIXME: Remember to remove this particlar code
      console.log("Oooops... Input can not be empty!!!");
    }

    // Adding 2-way binding for countryValue
    setcountryValue("");
  };

  return (
    <>
      <form className="Form" onSubmit={submitHandler}>
        <input
          type="text"
          className="Form-input"
          placeholder="Enter country name"
          value={countryValue}
          onChange={changeHandler}
        />
        <button className="Form-button" type="submit">
          Search
        </button>
      </form>
      {isSearchInputEmpty ? (
        <p className="App-empty-search_Error">Please enter a country name</p>
      ) : (
        ""
      )}
    </>
  );
};
export default SearchForm;
