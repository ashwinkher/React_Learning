import { Component, useEffect, useState } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonster] = useState(monsters);


  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
           .then((response) => response.json())
           .then((users) => setMonsters(users));
  },[]);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilterMonster(newFilteredMonsters);
  },[monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Roledex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="search monsters.."
      />
      <CardList monsters={filteredMonsters}></CardList>
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField : ''
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           }
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(()=>{
//       return {searchField}; //this means searchField is the key and the value will be value of searchField
//     });
//   }

//   render() {
//     console.log('render from Appjs');
//     const {monsters, searchField} = this.state;
//     const {onSearchChange} =this;

//     const filteredMonsters = monsters.filter((monster)=>{
//       return monster.name.toLowerCase().includes(searchField);
//     })

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Roledex</h1>
//         <SearchBox onChangeHandler={onSearchChange} className='search-box' placeholder='search monsters..'/>
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
