const BASE_URL = "https://apiinterview.threepixels.com.br/api/v1";

/**
 * Verifica se o CPF (username) existe
 */
export async function preSignin(cpf) {
  const response = await fetch(
    "https://apiinterview.threepixels.com.br/api/v1/authenticate/pre/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: cpf,
      }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error("Erro ao validar CPF");
  }

  if (!data.data.exists) {
    throw new Error("CPF não encontrado");
  }

  return data;
}

/**
 * Autentica usuário com CPF e senha
 */
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

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Erro ao autenticar");
  }

  return data;
}

/**
 * Verifica token ativo
 */
export async function checkToken(accessToken) {
  const response = await fetch(`${BASE_URL}/authenticate/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error("Token inválido");
  }

  return data;
}

/**
 * Renova access token
 */
export async function refreshToken(refreshToken) {
  const response = await fetch(`${BASE_URL}/authenticate/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error("Erro ao renovar token");
  }

  return data;
}

/**
 * Logout
 */
export async function signout(accessToken) {
  const response = await fetch(`${BASE_URL}/authenticate/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error("Erro ao deslogar");
  }

  return data;
}
