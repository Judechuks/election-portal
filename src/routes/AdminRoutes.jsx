import { Routes, Route } from "react-router-dom";

// Admin Components
import AdminPortal from "../pages/admin/AdminPortal";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ElectionCreator from "../components/admin/ElectionCreator";
import ElectionDashboard from "../components/admin/ElectionDashboard";
import CandidateManager from "../components/admin/CandidateManager";
import VoterManager from "../components/admin/VoterManager";
import VoterEligibility from "../components/admin/VoterEligibility";
import NewVoterForm from "../components/admin/NewVoterForm";
import ResultsExporter from "../components/admin/ResultsExporter";
import AuditLogViewer from "../components/admin/AuditLogViewer";
import AdminSettings from "../components/admin/AdminSettings";
import ElectionReports from "../components/admin/ElectionReports";
import ElectionPositions from "../components/admin/ElectionPositions";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminPortal />}>
        <Route index element={<AdminDashboard />} />
        {/* elections */}
        <Route path="elections">
          <Route index element={<ElectionDashboard />} />
          <Route path="create" element={<ElectionCreator />} />
          <Route path=":electionId" element={<ElectionDashboard />} />
          <Route path=":electionId/positions" element={<ElectionPositions />} />
          <Route
            path=":electionId/positions/:positionId/candidates"
            element={<CandidateManager />}
          />
          <Route path=":electionId/voters" element={<VoterEligibility />} />
          <Route path=":electionId/results" element={<ResultsExporter />} />
        </Route>
        {/* voters */}
        <Route path="voters">
          <Route index element={<VoterManager />} />
          <Route path="new" element={<NewVoterForm />} />
        </Route>
        {/* Reports */}
        <Route path="reports">
          <Route index element={<ElectionReports />} />
          <Route path=":electionId" element={<ResultsExporter />} />
        </Route>
        <Route path="audit" element={<AuditLogViewer />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
