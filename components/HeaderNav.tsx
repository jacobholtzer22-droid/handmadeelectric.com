"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import {
  navServiceGroups,
  navServiceItemsFlat,
} from "@/lib/content/nav-services";

/**
 * HEADER NAVIGATION: desktop dropdown plus mobile drawer.
 *
 * EVERY LINK IS ALWAYS IN THE DOM. The panel is never conditionally rendered,
 * it is hidden with visibility and opacity, so a crawler reading the static
 * HTML sees all seven internal service links whether the panel is open or not.
 * Conditional rendering would have hidden them from the link graph entirely,
 * which is the whole reason this site exists.
 *
 * Because the links stay in the DOM they must not be reachable by keyboard
 * while hidden, so closed panels get aria-hidden and their links get
 * tabIndex -1.
 *
 * MOBILE: the parent is never unreachable. The row is a link to /services plus
 * a SEPARATE chevron button that expands the sublist in place. Tapping the
 * label navigates, tapping the chevron expands.
 */

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeaderNav() {
  const pathname = usePathname();
  const panelId = useId();
  const mobilePanelId = useId();

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  /* Hover bridge: a short close delay so crossing the gap between the trigger
     and the panel does not dismiss it. Cancelled the moment either is entered. */
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  /* Route change closes everything. */
  useEffect(() => {
    setOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  /* Escape closes and returns focus to the trigger. Click-away closes. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (drawerOpen) setDrawerOpen(false);
    }
    function onPointer(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, drawerOpen]);

  /* Arrow keys traverse the panel items. */
  function focusItem(i: number) {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>(
      "[data-menuitem]"
    );
    if (!links || links.length === 0) return;
    const idx = (i + links.length) % links.length;
    links[idx]?.focus();
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
  }

  function onPanelKeyDown(e: React.KeyboardEvent) {
    const links = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menuitem]") ??
        []
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(links.length - 1);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  const servicesActive = isActive(pathname, "/services");

  return (
    <>
      {/* ---------------- Desktop ---------------- */}
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-7">
          <li
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            {/* Label LINKS to /services, chevron BUTTON toggles the panel.
                Same split as the mobile drawer, for two reasons: hovering then
                clicking a single toggle button closed the panel it had just
                opened, which reads as broken; and with a toggle-only trigger
                there was no way to reach /services from the desktop header at
                all. The parent is never unreachable. */}
            <span className="flex items-center">
              <Link
                href="/services"
                className={`inline-flex min-h-[44px] items-center font-panel text-[0.6875rem] uppercase tracking-panelwide transition-colors ${
                  servicesActive || open
                    ? "text-copper-bright"
                    : "text-ash hover:text-copper-bright"
                }`}
              >
                Services
              </Link>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? "Collapse services menu" : "Expand services menu"}
                onClick={() => setOpen((v) => !v)}
                onFocus={() => setOpen(true)}
                onKeyDown={onTriggerKeyDown}
                className={`inline-flex h-11 w-7 items-center justify-center transition-colors ${
                  servicesActive || open ? "text-copper-bright" : "text-ash"
                }`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </span>

            {/* Hover bridge. Covers the gap between trigger and panel so the
                pointer can cross without the panel closing. */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-full h-3 w-full ${
                open ? "" : "pointer-events-none"
              }`}
            />

            <div
              id={panelId}
              ref={panelRef}
              onKeyDown={onPanelKeyDown}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              aria-hidden={!open}
              data-open={open ? "" : undefined}
              className="nav-panel absolute left-0 top-[calc(100%+0.75rem)] z-50 w-[38rem] rounded-panel border border-steel bg-graphite p-6"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {navServiceGroups.map((group) => (
                  <div key={group.label}>
                    <p className="font-panel text-[0.625rem] uppercase tracking-panelwide text-ash/70">
                      {group.label}
                    </p>
                    <ul className="mt-3 space-y-3">
                      {group.items.map((it) => {
                        const active = pathname === it.href;
                        return (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              data-menuitem=""
                              tabIndex={open ? 0 : -1}
                              className="block rounded-panel px-2 py-1.5 transition-colors hover:bg-iron"
                            >
                              <span
                                className={`block text-[0.9375rem] font-semibold ${
                                  active ? "text-copper-bright" : "text-bone"
                                }`}
                              >
                                {it.title}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ash">
                                {it.descriptor}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="conduit-rule mt-6" aria-hidden="true" />
              <Link
                href="/services"
                data-menuitem=""
                tabIndex={open ? 0 : -1}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
              >
                View all services
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </li>

          {site.nav
            .filter((i) => i.href !== "/services")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-[44px] items-center font-panel text-[0.6875rem] uppercase tracking-panelwide transition-colors ${
                    isActive(pathname, item.href)
                      ? "text-copper-bright"
                      : "text-ash hover:text-copper-bright"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* ---------------- Mobile trigger ---------------- */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-expanded={drawerOpen}
        aria-controls={mobilePanelId}
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-panel border border-steel-light text-bone lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* ---------------- Mobile drawer ---------------- */}
      <div
        id={mobilePanelId}
        aria-hidden={!drawerOpen}
        data-open={drawerOpen ? "" : undefined}
        className="nav-drawer fixed inset-0 z-[60] lg:hidden"
      >
        <div
          className="absolute inset-0 bg-iron/80"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
        <div className="nav-drawer-panel absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto border-l border-steel bg-graphite">
          <div className="flex h-16 items-center justify-between border-b border-steel px-5">
            <span className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ash">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-panel border border-steel-light text-bone"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="px-5 py-4">
            {/* The parent stays reachable: the LABEL navigates, the CHEVRON
                expands. Two separate controls, never one overloaded row. */}
            <li className="border-b border-steel/70">
              <div className="flex items-stretch">
                <Link
                  href="/services"
                  tabIndex={drawerOpen ? 0 : -1}
                  className={`flex min-h-[52px] flex-1 items-center font-panel text-[0.75rem] uppercase tracking-panelwide ${
                    servicesActive ? "text-copper-bright" : "text-bone"
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  aria-label={
                    mobileServicesOpen
                      ? "Collapse services list"
                      : "Expand services list"
                  }
                  tabIndex={drawerOpen ? 0 : -1}
                  className="inline-flex h-[52px] w-12 items-center justify-center text-ash"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-150 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div
                data-open={mobileServicesOpen ? "" : undefined}
                aria-hidden={!mobileServicesOpen}
                className="nav-sublist"
              >
                <ul className="space-y-1 pb-4 pl-3">
                  {navServiceGroups.map((group) => (
                    <li key={group.label}>
                      <p className="mt-3 font-panel text-[0.625rem] uppercase tracking-panelwide text-ash/70">
                        {group.label}
                      </p>
                      <ul>
                        {group.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              tabIndex={drawerOpen && mobileServicesOpen ? 0 : -1}
                              className={`flex min-h-[44px] items-center py-1.5 text-[0.9375rem] ${
                                pathname === it.href
                                  ? "text-copper-bright"
                                  : "text-ash"
                              }`}
                            >
                              {it.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {site.nav
              .filter((i) => i.href !== "/services")
              .map((item) => (
                <li key={item.href} className="border-b border-steel/70">
                  <Link
                    href={item.href}
                    tabIndex={drawerOpen ? 0 : -1}
                    className={`flex min-h-[52px] items-center font-panel text-[0.75rem] uppercase tracking-panelwide ${
                      isActive(pathname, item.href)
                        ? "text-copper-bright"
                        : "text-bone"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="px-5 pb-8">
            <Link
              href="/contact"
              tabIndex={drawerOpen ? 0 : -1}
              className="btn-primary w-full"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/** Keeps the flat list referenced so the traversal contract stays documented. */
export const NAV_ITEM_COUNT = navServiceItemsFlat.length;
