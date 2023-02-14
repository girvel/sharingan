import './Login.css';

export default function Login({onLogin}) {
  // TODO forms
  function onSubmit() {
    onLogin(document.getElementById("username_input").value);
  }

  return (
    <>
      <h1>Sharingan</h1>
      <form className="login_form" onSubmit={onSubmit}>
        <input id="username_input" maxLength="40" placeholder="Username" className="login_element"></input>
        <button type="submit" className="login_element">Login</button>
      </form>
    </>
  );
}