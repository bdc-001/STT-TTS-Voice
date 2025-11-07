import { Link } from "wouter";
import { Mic, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background via-muted/10 to-background border-t border-border/40">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" data-testid="link-footer-home">
              <div className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-primary">Convin</span>
                  <span className="text-xs text-muted-foreground -mt-1 font-medium">Voice AI</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade Speech-to-Text and Text-to-Speech APIs for developers. 
              Build voice-enabled applications with ease.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-github" className="hover:bg-primary/10 hover:text-primary">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-twitter" className="hover:bg-primary/10 hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-linkedin" className="hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-email" className="hover:bg-primary/10 hover:text-primary">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <nav className="space-y-3 text-sm flex flex-col">
              <Link href="/features" data-testid="link-features">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Features</span>
              </Link>
              <Link href="/pricing" data-testid="link-footer-pricing">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Pricing</span>
              </Link>
              <Link href="/playground" data-testid="link-footer-playground">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Playground</span>
              </Link>
              <Link href="/enterprise" data-testid="link-enterprise">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Enterprise</span>
              </Link>
            </nav>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Developers</h3>
            <nav className="space-y-3 text-sm flex flex-col">
              <Link href="/docs" data-testid="link-footer-docs">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Documentation</span>
              </Link>
              <Link href="/api-reference" data-testid="link-api-reference">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">API Reference</span>
              </Link>
              <Link href="/sdks" data-testid="link-sdks">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">SDKs</span>
              </Link>
              <Link href="/status" data-testid="link-status">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Status Page</span>
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <nav className="space-y-3 text-sm flex flex-col">
              <Link href="/about" data-testid="link-about">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">About</span>
              </Link>
              <Link href="/blog" data-testid="link-blog">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Blog</span>
              </Link>
              <Link href="/careers" data-testid="link-careers">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Careers</span>
              </Link>
              <Link href="/contact" data-testid="link-contact">
                <span className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200">Contact</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" data-testid="link-privacy">
              <span className="hover:text-foreground transition-colors">Privacy Policy</span>
            </Link>
            <Link href="/terms" data-testid="link-terms">
              <span className="hover:text-foreground transition-colors">Terms of Service</span>
            </Link>
            <Link href="/security" data-testid="link-security">
              <span className="hover:text-foreground transition-colors">Security</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Convin Voice AI Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}