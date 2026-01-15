import { useState } from "react";
import { preSignin } from "../services/auth.service";

function Login({ setMode }) {
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleContinue() {
    setError("");
    setNotFound(false);
    setLoading(true);

    try {
      await preSignin(cpf);
      setStep(2); // CPF existe → pedir senha
    } catch (err) {
      setError(err.message);
      setNotFound(true); // CPF não existe
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <div>
        <h2>Login</h2>
        <p>Informe seu CPF</p>

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleContinue} disabled={loading}>
          {loading ? "Validando..." : notFound ? "Tente novamente" : "Continuar"}
        </button>

        {notFound && (
          <button onClick={() => setMode("signup")}>
            Fazer cadastro
          </button>
        )}
      </div>
    );
  }

  if (step === 2) {
    return <p>Senha (próximo passo)</p>;
  }

  return null;
}

export default Login;
