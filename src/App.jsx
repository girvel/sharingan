import './App.css'
import Skill from "./components/Skill"
import {fetchUserData, groupDataBySkills} from "./toolkit/db.js";


let grouped_skill_data = groupDataBySkills(await fetchUserData());


export default function App() {
  let skills = grouped_skill_data.map((data, i) =>
    <Skill key={i} data={data} data_index={i} />
  );

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
