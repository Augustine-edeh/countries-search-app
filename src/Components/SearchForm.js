import { useState } from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [countryValue, setcountryValue] = useState("");

  const [errorStatus, setErrorStatus] = useState(false);

  const changeHandler = (event) => {
    setcountryValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // checking if countryValue is not empty
    if (!!countryValue) {
      // Trying to set an error status and sending (lifting the errorStatus state to the App component) same error status to the App component
      setErrorStatus((previous) => false);
      props.onEmptyInput(errorStatus);

      console.log("Fetching country Data...");

      const countryURL = `https://restcountries.com/v3.1/name/${countryValue.trim()}`;
      fetch(countryURL)
        .then((response) => response.json())
        .then((countryData) => {
          // console.log(countryData);
          props.onReceiveCountryData(countryData);
        })
        .catch((err) => console.log(err));
    } else {
      props.onEmptyInput(() => {
        setErrorStatus(true);
        return true;
      });

      console.log("Oooops... Input can not be empty!!!");
    }

    // Adding 2-way binding for countryValue
    setcountryValue("");
  };
  return (
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
  );
};
export default SearchForm;
