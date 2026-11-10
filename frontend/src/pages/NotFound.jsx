import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black text-white px-6 py-24">
      <SEO
        title="404 - Page Not Found"
        description="The page you requested could not be found. Explore REBELWEAR streetwear and custom sportswear collections."
        noIndex={true}
      />
      <div className="max-w-xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-sm font-bold tracking-widest uppercase mb-6">
          Error 404
        </span>
        <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-4 bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
          LOST ROUTE
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
          This Page Has Gone Rogue
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed">
          The page you are looking for may have been moved, removed, or never existed. Dive back into our premium collections below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 bg-secondary text-white font-bold rounded-full text-sm uppercase tracking-wider hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30"
          >
            Return to Home
          </Link>
          <Link
            to="/streetwear"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all border border-white/20"
          >
            Streetwear
          </Link>
          <Link
            to="/uniforms"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all border border-white/20"
          >
            Team Uniforms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
