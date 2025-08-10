import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InvestorDashboard from "./pages/InvestorDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import InvestorLogin from "./pages/InvestorLogin";
import FarmerLogin from "./pages/FarmerLogin";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investor-login" element={<InvestorLogin />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route
            path="/investor-dashboard/*"
            element={
              <ProtectedRoute requiredUserType="investor">
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer-dashboard/*"
            element={
              <ProtectedRoute requiredUserType="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
