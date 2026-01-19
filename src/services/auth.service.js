const BASE_URL = "https://apiinterview.threepixels.com.br/api/v1";

export async function preSignin(cpf) {
  const response = await fetch(`${BASE_URL}/authenticate/pre/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: cpf }),
  });

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();

  return data.data.exists; // true ou false
}

export async function checkEmail(cpf, email) {
  const response = await fetch(`${BASE_URL}/authenticate/check/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: cpf,
      email: email,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Erro ao validar e-mail");
  }

  return data.data.exists; // true | false
}

export async function checkPhone(cpf, phone) {
  const response = await fetch(`${BASE_URL}/authenticate/check/phone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: cpf,
      phone: phone,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error?.message || "Erro ao validar telefone");
  }

  return data.data.exists; // true | false
}

export async function signin(cpf, password) {
  const response = await fetch(`${BASE_URL}/authenticate/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: cpf,
      password: password,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    return data;
  }

  return data;
}

export async function signup(payload) {
  const response = await fetch(`${BASE_URL}/authenticate/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json();

  return data;
}

export async function checkToken() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/authenticate/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${BASE_URL}/authenticate/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const data = await response.json();
  return data;
}



