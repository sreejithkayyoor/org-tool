import './App.css';
import Header from "./components/UI/Header";
import EmployeeSearch from "./components/EmployeeSearch/EmployeeSearch";
import SearchResults from "./components/SearchResults/SearchResult";
import { useState } from 'react';


function App() {
  const [searchText, setSearchText] = useState('');

  const searchHandler = (value) => {
    setSearchText(value.trim());
  }
  return (
    <div className="App">
      <Header />
      <EmployeeSearch searchHandler={searchHandler} />
      <SearchResults keyword={searchText} />
    </div>
  );
}

export default App;
