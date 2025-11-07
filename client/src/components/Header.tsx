import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Mic, Code, User, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1">
            <div className="bg-gradient-to-r from-primary to-chart-2 p-2 rounded-md">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Convin</span>
              <span className="text-xs text-muted-foreground -mt-1">Voice AI</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/docs" data-testid="link-docs">
            <span className="text-sm font-semibold hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-primary">Documentation</span>
          </Link>
          <Link href="/playground" data-testid="link-playground">
            <span className="text-sm font-semibold hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-primary">Playground</span>
          </Link>
          <Link href="/pricing" data-testid="link-pricing">
            <span className="text-sm font-semibold hover:text-primary transition-colors hover:underline underline-offset-4 decoration-2 decoration-primary">Pricing</span>
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/signin">
            <Button variant="ghost" size="sm" data-testid="button-signin" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link href="/contact">
            <Button 
              variant="default" 
              size="sm" 
              data-testid="button-book-demo"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase text-xs rounded-lg transition-all duration-200"
            >
              Book a Demo
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/docs" data-testid="link-mobile-docs">
              <span className="text-sm font-medium">Documentation</span>
            </Link>
            <Link href="/playground" data-testid="link-mobile-playground">
              <span className="text-sm font-medium">Playground</span>
            </Link>
            <Link href="/pricing" data-testid="link-mobile-pricing">
              <span className="text-sm font-medium">Pricing</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}