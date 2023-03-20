import "./App.css";
import Title from "./Components/Title";
import SearchForm from "./Components/SearchForm";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <Title />
        <SearchForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
