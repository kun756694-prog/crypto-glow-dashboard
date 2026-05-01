import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Code-split secondary routes so they don't bloat the initial bundle
const FdxCoin = lazy(() => import("./pages/FdxCoin"));
const Advertise = lazy(() => import("./pages/Advertise"));
const Investors = lazy(() => import("./pages/Investors"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Earn = lazy(() => import("./pages/Earn"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const RouteFallback = () => <div className="min-h-screen" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/fdx"
            element={
              <Suspense fallback={<RouteFallback />}>
                <FdxCoin />
              </Suspense>
            }
          />
          <Route
            path="/advertise"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Advertise />
              </Suspense>
            }
          />
          <Route
            path="/investors"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Investors />
              </Suspense>
            }
          />
          <Route
            path="/toolbox"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Toolbox />
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Terms />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <BlogPost />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
