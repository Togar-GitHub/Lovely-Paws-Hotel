import { FaLinkedin, FaGithub } from "react-icons/fa";
import foot from "./Footer.module.css";

function Footer() {
  return (
    <div className={foot.mainContainer}>
      <a
        className={foot.linkButtonContainer}
        href="https://www.linkedin.com/in/togar-mamora-550358b7/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={foot.linkedin}>
          <FaLinkedin size={30} />
        </button>
      </a>
      <a
        className={foot.linkButtonContainer}
        href="https://github.com/Togar-GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={foot.github}>
          <FaGithub size={30} />
        </button>
      </a>
    </div>
  );
}

export default Footer;