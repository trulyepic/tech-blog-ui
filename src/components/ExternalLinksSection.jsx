import ExternalLinkCard from "./ExternalLinkCard";
import exhibitImg from "../assets/images/exhibt.png";
import starflickWikiImg from "../assets/images/starflick.png";
import discApp from "../assets/images/trackdisc.png";

const externalLinks = [
  {
    title: "Ex-hibt",
    url: "https://www.ex-hibt.com/",
    description:
      "Create Your Images Collections & Explore Collections From Other Users",
    image: exhibitImg,
    favicon: "https://www.ex-hibt.com/favicon.ico",
  },
  {
    title: "StarFlick Wiki Hub",
    url: "https://www.starflickswiki.com/",
    description:
      "Starflicks WikiExplore information on all your favorite Korean shows and Star them up",
    image: starflickWikiImg,
    favicon: "https://www.starflickswiki.com/favicon.ico",
  },
  {
    title: "Music Discovery App",
    url: "https://www.trackdiscov.com/",
    description: "Discover new music based on your favorite tracks",
    image: discApp,
    favicon: "https://www.trackdiscov.com/favicon.ico",
  },
];

const ExternalLinksSection = ({ isGrid = false, limit }) => {
  const linksToDisplay = limit ? externalLinks.slice(0, limit) : externalLinks;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">External Links</h3>
      <div
        className={
          isGrid
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {linksToDisplay.map((link, idx) => (
          <ExternalLinkCard key={idx} link={link} />
        ))}
      </div>
    </div>
  );
};

export default ExternalLinksSection;
