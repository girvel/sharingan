import './App.css'
import Skill from "./components/Skill"
import {fetchUserData, groupDataBySkills} from "./toolkit/db.js";
import {useState} from "react";
import {inDevelopmentMode} from "./toolkit/stuff.js";


export default function App() {
  let [skills, setSkills] = useState([]);

  if (skills.length == 0) {
    fetchUserData().then(data => {
      setSkills(groupDataBySkills(data).map((data, i) =>
        <Skill key={i} data={data} data_index={i}/>
      ));
    });
  }

  console.log(inDevelopmentMode());

  return (
    <>
      <h1>Sharingan</h1>
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
