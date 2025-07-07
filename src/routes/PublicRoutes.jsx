import { Routes, Route } from "react-router-dom";

// Public Components
import PublicPageLayout from "../pages/layout/PublicPageLayout";
import Home from "../pages/public/Home";
import PublicResults from "../pages/public/PublicResults";
import ActiveElections from "../pages/public/ActiveElections";
import HowToVote from "../pages/public/HowToVote";
import ElectionRules from "../pages/public/ElectionRules";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsOfService from "../pages/public/TermsOfService";
import NotFound from "../pages/error/NotFound";
import ConcludedElections from "../pages/public/ConcludedElections";
import ElectionResults from "../pages/public/ElectionResults";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicPageLayout />}>
        <Route index element={<Home />} />
        <Route path="/live-results" element={<ActiveElections />} />
        <Route path="/live-results/:electionId" element={<PublicResults />} />
        <Route path="/results" element={<ConcludedElections />} />
        <Route path="/results/:electionId" element={<ElectionResults />} />
        <Route path="/how-to-vote" element={<HowToVote />} />
        <Route path="/election-rules" element={<ElectionRules />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
