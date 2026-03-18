import "./Footer.css";
import discordIcon from "../../assets/media/discord.svg";
import telegramIcon from "../../assets/media/telegram-svgrepo-com.svg";
import instagrammIcon from "../../assets/media/instagram-1-svgrepo-com.svg";
import githubIcon from "../../assets/media/github-square-svgrepo-com.svg";

const SOCIALS = [
  {
    id: 1,
    name: "Discord",
    href: "discordapp.com/users/566135632821354496",
    icon: discordIcon,
  },
  {
    id: 2,
    name: "Telegram",
    href: "https://t.me/SilenlyTT",
    icon: telegramIcon,
  },
  {
    id: 3,
    name: "GitHub",
    href: "https://github.com/Sinonmn",
    icon: githubIcon,
  },
  {
    id: 4,
    name: "Instagram",
    href: "https://www.instagram.com/kasakate_xx/",
    icon: instagrammIcon,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__social-list">
        {SOCIALS.map(({ id, name, href, icon }) => (
          <li className="footer__social-item" key={id}>
            <a href={href} className="footer__social-link" rel="noreferrer">
              <img src={icon} alt={name} className="footer__social-icon" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
