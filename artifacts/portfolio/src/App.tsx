import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider, useAdmin } from "@/contexts/admin-context";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { AdminLogin } from "@/pages/admin/login";
import { AdminLayout } from "@/pages/admin/layout";
import { AdminDashboard } from "@/pages/admin/dashboard";
import { AdminProjects } from "@/pages/admin/projects";
import { AdminSkills } from "@/pages/admin/skills";
import { AdminExperience } from "@/pages/admin/experience";
import { AdminProfile } from "@/pages/admin/profile";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAdmin();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-zinc-600" />
      </div>
    );
  }
  if (!authenticated) return <AdminLogin />;
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/admin">
        <AdminGuard>
          <AdminLayout><AdminDashboard /></AdminLayout>
        </AdminGuard>
      </Route>
      <Route path="/admin/projects">
        <AdminGuard>
          <AdminLayout><AdminProjects /></AdminLayout>
        </AdminGuard>
      </Route>
      <Route path="/admin/skills">
        <AdminGuard>
          <AdminLayout><AdminSkills /></AdminLayout>
        </AdminGuard>
      </Route>
      <Route path="/admin/experience">
        <AdminGuard>
          <AdminLayout><AdminExperience /></AdminLayout>
        </AdminGuard>
      </Route>
      <Route path="/admin/profile">
        <AdminGuard>
          <AdminLayout><AdminProfile /></AdminLayout>
        </AdminGuard>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AdminProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
