import './Login.css';

export default function Login({onLogin}) {
  function onSubmit(event) {
    event.preventDefault();

    let value = document.getElementById("username_input").value;
    if (value === "") return;

    onLogin(value);
  }

  return (
    <>
      <h1>Sharingan</h1>
      <form className="login_form" onSubmit={onSubmit}>
        <input
          autoFocus
          id="username_input"
          maxLength="40"
          placeholder="Username"
          className="login_element"
        ></input>

        <button type="submit" className="login_element login_button">Enter</button>
      </form>
    </>
  );
}