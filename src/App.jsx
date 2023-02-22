import './App.css'
import Skill from "./components/Skill"
import {fetchUserData, groupDataBySkills} from "./toolkit/db.js";
import {useState} from "react";
import Login from "./Login.jsx";


export default function App() {
  let [username, setUsername] = useState(null);
  let [skills, setSkills] = useState([]);


  if (username === null) {
    return <Login onLogin={setUsername} />
  }

  if (skills.length == 0) {
    fetchUserData(username).then(data => {
      setSkills(groupDataBySkills(data).map((data, i) =>
        <Skill key={i} data={data} username={username}/>
      ));
    });
  }

  return (
    <>
      <h1>{username}</h1>
      <div>
        <table className="hidden_table">
          <tbody>
            {skills}
          </tbody>
        </table>
      </div>
    </>
  );
}
