import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Documentation from "@/pages/Documentation";
import Playground from "@/pages/Playground";
import PricingPage from "@/pages/PricingPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

// Platform Pages
import PlatformHome from "@/pages/platform/PlatformHome";
import VoiceLibrary from "@/pages/platform/VoiceLibrary";
import VoiceStudio from "@/pages/platform/VoiceStudio";
import STTPlayground from "@/pages/platform/STTPlayground";
import TTSPlayground from "@/pages/platform/TTSPlayground";
import Analytics from "@/pages/platform/Analytics";
import ComplianceManager from "@/pages/platform/ComplianceManager";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/docs" component={Documentation} />
      <Route path="/playground" component={Playground} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Platform Routes */}
      <Route path="/platform" component={PlatformHome} />
      <Route path="/platform/voices/library" component={VoiceLibrary} />
      <Route path="/platform/voices/studio" component={VoiceStudio} />
      <Route path="/platform/stt/playground" component={STTPlayground} />
      <Route path="/platform/tts/playground" component={TTSPlayground} />
      <Route path="/platform/analytics" component={Analytics} />
      <Route path="/platform/compliance" component={ComplianceManager} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
