const domain = process.env.SITE_DOMAIN || "https://sitetuveux.com";
const siteEnv = process.env.SITE_ENV || (domain.includes("stg.") ? "staging" : "production");
const isStaging = siteEnv === "staging";

module.exports = {
  name: "Site tu veux",
  domain,
  lang: "fr",
  locale: "fr_FR",
  description:
    "Site tu veux, agence de création de site internet, référencement, marque, logo, pour devenir visible, en mieux !",
  author: "Site tu veux",
  email: "contact@sitetuveux.com",
  socialImage: "/assets/images/hero.jpg",
  robots: isStaging ? "noindex,nofollow" : "index,follow",
  isStaging,
};
