import { Routes, Route } from "react-router-dom";

// Student Components
import StudentPortal from "../pages/student/StudentPortal";
import ElectionList from "../components/student/ElectionList";
import VotingBooth from "../components/student/VotingBooth";
import VoteConfirmation from "../components/student/VoteConfirmation";
import ViewElectionPositions from "../pages/student/ViewElectionPositions";

// Public
import PublicPageLayout from "../pages/layout/PublicPageLayout";
import NotFound from "../pages/error/NotFound";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<StudentPortal />}>
        <Route index element={<ElectionList />} />
        <Route path="vote/:electionId" element={<VotingBooth />} />
        <Route path="confirmation" element={<VoteConfirmation />} />
      </Route>
      <Route path="/*" element={<PublicPageLayout />}>
        <Route
          path="positions/:electionId"
          element={<ViewElectionPositions />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
