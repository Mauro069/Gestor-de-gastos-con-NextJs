import { SidebarButton } from "./components/SidebarButton";
import { useAuth } from "@/hooks";
import Image from "next/image";

import styles from "./styles.module.scss";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const Sidebar = ({ isOpen, toggleMenu }: SidebarProps) => {
  const links = [
    {
      to: "/home",
      icon: "/assets/Home.svg",
      text: "Dashboard",
    },
    {
      to: "/home",
      icon: "/assets/Reports.svg",
      text: "Ingresos",
    },
    {
      to: "/home",
      icon: "/assets/Page.svg",
      text: "Gastos",
    },
  ];

  const { user } = useAuth();

  const IMG_URL =
    "https://scontent.cdninstagram.com/v/t51.2885-19/324711890_1256486818416045_3704775504934711050_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=Yl42pOZQoJ8AX_flfNa&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBG6ZzVI5buaYEic7qzAOy-1qRIpWTX5SMXanEHgHQcNQ&oe=646FDF4C&_nc_sid=df044f";

  return (
    <aside className={`${styles.sidebar} ${isOpen && styles.open}`}>
      <div className={styles.top}>
        <div className={styles.imageContainer}>
          <Image src={IMG_URL} alt="perfil" height={44} width={44} />
          {isOpen && (
            <div className={styles.welcome}>
              <p>Bienvenido!</p>
              <span>
                {user?.firstname} {user?.lastname}
              </span>
            </div>
          )}
          <div
            onClick={toggleMenu}
            className={`${styles.unionButton} ${isOpen && styles.open}`}
          >
            <Image src="/assets/Union.svg" alt="union" height={10} width={16} />
          </div>
        </div>

        <div className={styles.links}>
          {links.map(({ icon, text, to }) => (
            <SidebarButton
              isMenuOpen={isOpen}
              href={to}
              text={text}
              icon={icon}
              key={text}
            />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <SidebarButton
          isMenuOpen={isOpen}
          href="/dashboard/config"
          text="Settings"
          icon="/assets/Settings.svg"
        />
        <SidebarButton
          onClick={() => console.log("agregar logica del logout")}
          isMenuOpen={isOpen}
          text="Logout"
          icon="/assets/Logout.svg"
        />
      </div>
    </aside>
  );
};
