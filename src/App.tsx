import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Documentation from "./pages/Documentation";
import GovernanceStandards from "./pages/GovernanceStandards";
import CustomerTransformerDetection from "./pages/CustomerTransformerDetection";
import Reports from "./pages/Reports";
import WorkOrdersOnHold from "./pages/WorkOrdersOnHold";
import GISDiscrepancy from "./pages/GISDiscrepancy";
import AssetDataProcess from "./pages/AssetDataProcess";
import ProcessesProcedures from "./pages/ProcessesProcedures";
import Maintenance from "./pages/Maintenance";
import TrainingTutorials from "./pages/TrainingTutorials";
import APIConnection from "./pages/APIConnection";
import APIConnectionPOST from "./pages/APIConnectionPOST";
import ProcessImprovementNEW from "./pages/ProcessImprovementNEW";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboards/asset-data-process" element={<AssetDataProcess />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/workorders-on-hold" element={<WorkOrdersOnHold />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/governance" element={<GovernanceStandards />} />
            <Route path="/documentation/processes-procedures" element={<ProcessesProcedures />} />
            <Route path="/documentation/training-tutorials" element={<TrainingTutorials />} />
            <Route path="/projects/customer-transformer-detection" element={<CustomerTransformerDetection />} />
            <Route path="/dashboards/asset-data-quality/gis-sap-discrepancy" element={<GISDiscrepancy />} />
            <Route path="/process-improvement-new" element={<ProcessImprovementNEW />} />
            <Route path="/api-connection" element={<APIConnection />} />
            <Route path="/api-connection-post" element={<APIConnectionPOST />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
