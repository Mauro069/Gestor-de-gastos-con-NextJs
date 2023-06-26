import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface SidebarButtonProps {
  href?: string;
  icon: string;
  text: string;
  isMenuOpen: boolean;
  onClick?: () => void;
}

export const SidebarButton = ({
  href,
  icon,
  text,
  isMenuOpen,
  onClick,
}: SidebarButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  // return href ? (
  //   <Link href={href} className={styles.sidebarButton}>
  //     <div className={styles.iconContainer}>
  //       <Image src={icon} alt={text} height={20} width={20} />
  //     </div>
  //     {isMenuOpen && <span>{text}</span>}
  //   </Link>
  // ) : (
  //   <button onClick={handleClick} className={styles.sidebarButton}>
  //     <div className={styles.iconContainer}>
  //       <Image src={icon} alt={text} height={20} width={20} />
  //     </div>
  //     {isMenuOpen && <span>{text}</span>}
  //   </button>
  // );

  return (
    <button onClick={handleClick} className={styles.sidebarButton}>
      <div className={styles.iconContainer}>
        <Image src={icon} alt={text} height={20} width={20} />
      </div>
      {isMenuOpen && <span>{text}</span>}
    </button>
  );
};
