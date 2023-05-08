import NotificationContext from "@/context/notificationContext";
import { useContext, useEffect, useState } from "react";
import { Button, Input } from "@/components";
import { useAuth, useForm } from "@/hooks";
import { routes } from "@/routes";
import { IUser } from "@/models";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/authPage.module.scss";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showNotification } = useContext(NotificationContext);
  const { values, handleChange, handleSubmit } = useForm<IUser>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let { email, password } = values;
      if (email && password) {
        const user = { email, password };
        const response: any = await login!(user);

        // @ts-ignore
        showNotification({
          msj: response?.msj || "Ocurrio un error, intenta nuevamente",
          open: true,
          status: response?.ok ? "success" : "error",
        });
      } else {
        // @ts-ignore
        showNotification({
          msj: "Verifica los datos que estas enviando!",
          open: true,
          status: "error",
        });
      }

      setLoading(false);
    },
  });

  return (
    <div className={styles.authPage}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>Inicio de Sesión</h3>
          <Input
            onChange={handleChange}
            value={values.email}
            placeholder="Ingresa tu correo..."
            label="Correo"
            name="email"
            type="email"
          />

          <Input
            onChange={handleChange}
            value={values.password}
            placeholder="Ingresa tu contraseña..."
            label="Contraseña"
            name="password"
            type="password"
          />
          <Button
            backgroundColor="#c75200"
            buttonText="Iniciar Sesión"
            isLoading={loading}
          />
          <span className={styles.link}>
            Aun no tienes cuenta? <Link href={routes.register}>Registrate</Link>
          </span>
        </form>
      </div>
      <div className={styles.backgroundDark}>
        <div className={styles.imgContainer}>
          <Image
            width={1920}
            height={1080}
            src="/auth-bg.png"
            alt="Login Background"
          />
        </div>
      </div>
    </div>
  );
}
