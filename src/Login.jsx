export default function Login({onLogin}) {
  // TODO forms
  function onSubmit() {
    onLogin(document.getElementById("username_input").value)
  }

  return (
    <form>
      <input id="username_input"></input>
      <button onClick={onSubmit}>Login</button>
    </form>
  )
}