import { useState } from "react";
import {
  preSignin,
  checkEmail,
  checkPhone,
  signin,
} from "../services/auth.service";

function Login() {
  const [step, setStep] = useState("cpf"); // cpf | email | phone | password
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (step === "cpf") {
        const exists = await preSignin(cpf);
        if (!exists) {
          setError("CPF não encontrado");
          return;
        }
        setStep("email");
        return;
      }

      if (step === "email") {
        const exists = await checkEmail(cpf, email);
        if (!exists) {
          setError("E-mail não confere com o CPF");
          return;
        }
        setStep("phone");
        return;
      }

      if (step === "phone") {
        const exists = await checkPhone(cpf, phone);
        if (!exists) {
          setError("Telefone não confere com o CPF");
          return;
        }
        setStep("password");
        return;
      }

      if (step === "password") {
        const response = await signin(cpf, password);

        if (!response.success) {
          setError("Senha incorreta");
          return;
        }

        alert("LOGIN OK");
        return;
      }
    } catch (err) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {step === "cpf" && (
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      )}

      {step === "email" && (
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {step === "phone" && (
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      {step === "password" && (
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Aguarde..." : "Continuar"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
