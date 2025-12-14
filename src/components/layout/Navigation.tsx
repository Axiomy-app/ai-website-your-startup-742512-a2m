'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'AutoFlow',
  brandIcon: 'zap',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Get Started',
  ctaHref: '#pricing',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <User className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-foreground" data-editable="brandName">
              {config.brandName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex items-center space-x-8" role="menubar">
              {config.navItems.map((item, idx) => (
                <li key={idx} role="none">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                    data-editable-href={`navItems[${idx}].href`}
                    data-href={item.href}
                    role="menuitem"
                  >
                    <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background text-foreground border-border w-80"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <User className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-xl font-bold text-foreground" data-editable="brandName">
                        {config.brandName}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 py-6">
                    <ul className="space-y-4" role="menu">
                      {config.navItems.map((item, idx) => (
                        <li key={idx} role="none">
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className="w-full text-left py-3 px-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200"
                            data-editable-href={`navItems[${idx}].href`}
                            data-href={item.href}
                            role="menuitem"
                          >
                            <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
