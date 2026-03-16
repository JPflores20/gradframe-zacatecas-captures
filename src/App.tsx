import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/index.tsx";
import Cuadros from "./pages/cuadros.tsx";
import Estolas from "./pages/estolas.tsx";
import AdminAgenda from "./pages/admin_agenda.tsx";
import AdminLogin from "./pages/admin_login.tsx";
import PublicAgenda from "./pages/public_agenda.tsx";
import EventCodeEntry from "./pages/event_code_entry.tsx";
import EventRegistrationForm from "./pages/event_registration_form.tsx";
import NotFound from "./pages/not_found.tsx";
import ProtectedRoute from "./components/protected_route.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cuadros" element={<Cuadros />} />
          <Route path="/estolas" element={<Estolas />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/agenda"
            element={
              <ProtectedRoute>
                <AdminAgenda />
              </ProtectedRoute>
            }
          />
          <Route path="/agenda" element={<PublicAgenda />} />
          <Route path="/ingresar-codigo" element={<EventCodeEntry />} />
          <Route path="/registro/:code" element={<EventRegistrationForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
