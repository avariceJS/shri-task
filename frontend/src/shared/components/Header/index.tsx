import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logoRight from "/logo1.png";
import logoLeft from "/logo2.png";
import downloadIcon from "/download.png";
import generatorIcon from "/generator.png";
import historyIcon from "/historyIcon.png";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.logo}>
                    <img src={logoLeft} width={228} height={53} alt="logo" />
                    <img src={logoRight} width={27} height={27} alt="logo" />
                </div>
                <span className={styles.title}>Межгалактическая аналитика</span>
            </div>

            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <img src={downloadIcon} width={27} height={27} alt="icon" />
                    <span>CSV Аналитик</span>
                </NavLink>

                <NavLink
                    to="/generate"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <img
                        src={generatorIcon}
                        width={27}
                        height={27}
                        alt="icon"
                    />
                    <span>CSV Генератор</span>
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <img src={historyIcon} width={27} height={27} alt="icon" />
                    <span>История</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
