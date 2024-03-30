import { Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";
import "./NavBar.css";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com", icon: <Facebook /> },
  { name: "Instagram", url: "https://www.instagram.com", icon: <Instagram /> },
  { name: "Pinterest", url: "https://www.pinterest.com", icon: <Pinterest /> },
];

const footerLinks = [
  { text: "Contact Us", url: "/contact" },
  { text: "Terms and Conditions", url: "/terms" },
  { text: "Privacy Policy", url: "/privacy" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          direction="row"
          alignItems="center"
        >
          {socialLinks.map((link) => (
            <Link href={link.url} key={link.name} className="socialLink" target="_blank" rel="noreferrer">
              {/* Using IconButton for Material-UI icon buttons */}
              <IconButton>{link.icon}</IconButton>
              {link.name}
            </Link>
          ))}
        </Grid>
        <Typography variant="body2" className="copyright">
          &copy; Sarah McGregor, 2024
        </Typography>
        <Grid item xs={12}>
          <div className="footerLinksContainer">
            {footerLinks.map((link) => (
              <Link href={link.url} key={link.text} className="footerLink">
                {link.text}
              </Link>
            ))}
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
