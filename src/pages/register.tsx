import { useAuth, useForm } from "@/hooks";
import { Input } from "@/components";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/authPage.module.scss";

export default function RegisterPage() {
  const { register } = useAuth();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      let { firstname, lastname, email, password, confirmPassword } = values;
      if (firstname && lastname && email && password && confirmPassword) {
        if (password === confirmPassword) {
          const user = { firstname, lastname, email, password };
          await register!(user);
        }
      }
    },
  });

  return (
    <div className={styles.authPage}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>Crea tu cuenta</h3>
          <div className={styles.twoInputs}>
            <Input
              onChange={handleChange}
              value={values.firstname}
              placeholder="Nombre..."
              label="Nombre"
              name="firstname"
              type="text"
            />

            <Input
              onChange={handleChange}
              value={values.lastname}
              placeholder="Apellido..."
              label="Apellido"
              name="lastname"
              type="text"
            />
          </div>
          <Input
            onChange={handleChange}
            value={values.email}
            placeholder="Ingresa un correo..."
            label="Correo"
            name="email"
            type="email"
          />

          <Input
            onChange={handleChange}
            value={values.password}
            placeholder="Ingresa una contraseña..."
            label="Contraseña"
            name="password"
            type="password"
          />

          <Input
            onChange={handleChange}
            value={values.confirmPassword}
            placeholder="Confirma la contraseña..."
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
          />
          <button className={styles.submitButton} type="submit">
            Crear cuenta
          </button>
          <span className={styles.link}>
            Ya tienes cuenta? <Link href="/">Inicia Sesión</Link>
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
