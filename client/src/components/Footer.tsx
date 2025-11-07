import { Link } from "wouter";
import { Mic, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" data-testid="link-footer-home">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary to-chart-2 p-2 rounded-md">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Convin</span>
                  <span className="text-xs text-muted-foreground -mt-1">Voice AI</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade Speech-to-Text and Text-to-Speech APIs for developers. 
              Build voice-enabled applications with ease.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-github">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-email">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/features" data-testid="link-features">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Features</span>
              </Link>
              <Link href="/pricing" data-testid="link-footer-pricing">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Pricing</span>
              </Link>
              <Link href="/playground" data-testid="link-footer-playground">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Playground</span>
              </Link>
              <Link href="/enterprise" data-testid="link-enterprise">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Enterprise</span>
              </Link>
            </nav>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="font-semibold">Developers</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/docs" data-testid="link-footer-docs">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Documentation</span>
              </Link>
              <Link href="/api-reference" data-testid="link-api-reference">
                <span className="text-muted-foreground hover:text-foreground transition-colors">API Reference</span>
              </Link>
              <Link href="/sdks" data-testid="link-sdks">
                <span className="text-muted-foreground hover:text-foreground transition-colors">SDKs</span>
              </Link>
              <Link href="/status" data-testid="link-status">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Status Page</span>
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/about" data-testid="link-about">
                <span className="text-muted-foreground hover:text-foreground transition-colors">About</span>
              </Link>
              <Link href="/blog" data-testid="link-blog">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Blog</span>
              </Link>
              <Link href="/careers" data-testid="link-careers">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Careers</span>
              </Link>
              <Link href="/contact" data-testid="link-contact">
                <span className="text-muted-foreground hover:text-foreground transition-colors">Contact</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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