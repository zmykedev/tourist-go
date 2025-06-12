import { HeroSection } from './sections/Hero-Section';
import { FeaturesSection } from './sections/Features-Section';
import { CTA as CallToAction } from './sections/CTA';

const LandingPage: React.FC = () => {
  return (
    <div className="scroll-smooth snap-y snap-mandatory h-screen overflow-y-scroll">
        <HeroSection />
      <div className="snap-start">
        <FeaturesSection />
      </div>
      <div className="snap-start">
        <CallToAction />
      </div>
    </div>
  );
};
export default LandingPage; 