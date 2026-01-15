import { useState } from "react";
import Login from "./pages/Login";

function App() {
  const [mode, setMode] = useState(null);

  if (mode === null) {
    return (
      <div>
        <h1>Bem Vindo</h1>
        <p>Escolha uma opção para continuar</p>
        <button onClick={() => setMode("login")}>Entrar</button>
        <button onClick={() => setMode("signup")}>Criar Conta</button>
      </div>
    );
  }

  if (mode === "login") {
    return <Login setMode={setMode} />;
  }

  if (mode === "signup") {
    return <h2>Tela de cadastro (Em construção)</h2>;
  }

  return null;
}

export default App;
