
import { Input, Switch } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, FormEvent, useState } from "react";

import styles from "../styles/authPage.module.scss";

export default function AuthPage() {
  const [auth, setAuth] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });

  let titles = {
    login: "Iniciar Sesión",
    register: "Registrarse",
  };

  const { login, register } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { email, password } = form;
    const user = { email, password };
    if (auth === "login") {
      // @ts-ignore
      await login(user);
    }

    if (auth === "register") {
      // @ts-ignore
      await register(user);
    }
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Gestify</h1>
      <div className={styles.col}>
        <div className={styles.switches}>
          <Switch
            title="Iniciar Sesión"
            onSwitch={() => setAuth("login")}
            isActive={auth === "login"}
          />
          <Switch
            title="Registrarse"
            onSwitch={() => setAuth("register")}
            isActive={auth === "register"}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>{titles[auth]}</h3>
          <div className={styles.inputs}>
            <Input
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className={styles.button}>{titles[auth]}</button>
        </form>
      </div>
    </div>
  );
}
