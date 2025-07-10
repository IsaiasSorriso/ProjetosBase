import { useState } from "react";

export default function EsqueciSenha({ onVoltar }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    if (!email) {
      setMsg("Informe seu e-mail.");
      return;
    }
    try {
      const res = await fetch("https://sua-api.com/api/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.");
      } else {
        setMsg(data.error || "Erro ao solicitar redefinição.");
      }
    } catch {
      setMsg("Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recuperar Senha</h2>
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
      <button type="button" onClick={onVoltar} style={{ background: "#eee", color: "#333", marginTop: "0.5rem" }}>
        Voltar
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
}