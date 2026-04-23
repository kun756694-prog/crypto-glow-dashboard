import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import FdxCoin from "./pages/FdxCoin";
import Advertise from "./pages/Advertise";
import Investors from "./pages/Investors";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Code-split the toolbox so its widgets never load on the main dashboard
const Toolbox = lazy(() => import("./pages/Toolbox"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fdx" element={<FdxCoin />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/investors" element={<Investors />} />
          <Route
            path="/toolbox"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <Toolbox />
              </Suspense>
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
