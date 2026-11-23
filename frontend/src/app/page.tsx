"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BadgeDollarSignIcon,
  Task01Icon,
  Note01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Wallet01Icon,
  Calendar03Icon,
  EyeIcon,
  EyeOffIcon,
  BankIcon,
  CreditCardIcon,
  PiggyBankIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "cn";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "finance" | "tasks" | "notes">("all");
  const [showValues, setShowValues] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* =========================================================================
          NAVIGATION HEADER
      ========================================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <span className="font-bold text-base tracking-tight">LH</span>
            </div>
            <span className="text-xl font-bold tracking-tight">LifeHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#preview" className="transition-colors hover:text-foreground">
              Preview
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#tech" className="transition-colors hover:text-foreground">
              Tech Stack
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register" className="flex items-center gap-1.5">
                <span>Get started</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =========================================================================
            HERO SECTION
        ========================================================================== */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-primary/20 to-muted opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Your all-in-one personal productivity and finance suite
              </div>

              {/* Headline */}
              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your ideas, finance, and tasks. <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                  All in the same Hub.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
                LifeHub unifies personal finance management, dynamic task tracking, and quick
                note-taking into a clean, lightning-fast experience.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6 h-11 text-sm font-semibold shadow-md" asChild>
                  <Link href="/register" className="flex items-center justify-center gap-2">
                    <span>Start for free</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 h-11 text-sm" asChild>
                  <Link href="/login">I already have an account</Link>
                </Button>
              </div>

              {/* Highlights */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500" />
                  <span>No ads or clutter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500" />
                  <span>Google & GitHub OAuth</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500" />
                  <span>Next.js & NestJS performance</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                REAL APP SHOWCASE / ACCURATE PREVIEW
            ========================================================================== */}
            <div id="preview" className="mt-16 rounded-2xl border border-border bg-card/60 p-4 shadow-xl backdrop-blur-sm sm:p-6 lg:p-8">
              {/* Showcase Header with Real Tab Filter */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Interactive App Interface</h3>
                  <p className="text-xs text-muted-foreground">
                    Experience the real components built for everyday productivity
                  </p>
                </div>

                {/* Tabs matching real modules */}
                <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
                  {(["all", "finance", "tasks", "notes"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-medium capitalize transition-all cursor-pointer",
                        activeTab === tab
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* 1. REAL FINANCE COMPONENT PREVIEW */}
                {(activeTab === "all" || activeTab === "finance") && (
                  <div className="space-y-4">
                    {/* Consolidated Balance Card (True to LifeHub) */}
                    <div className="relative overflow-hidden rounded-xl border bg-linear-to-br from-card via-card to-muted/30 p-5 shadow-xs w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary shrink-0 ring-1 ring-primary/20">
                            <HugeiconsIcon icon={Wallet01Icon} size={22} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Consolidated Balance
                              </span>
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                3 accounts
                              </span>
                            </div>

                            <div className="flex items-baseline gap-2 mt-1">
                              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                {showValues ? "$ 14,850.00" : "••••••••"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive toggle */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowValues(!showValues)}
                            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <HugeiconsIcon icon={showValues ? EyeOffIcon : EyeIcon} size={16} />
                            <span>{showValues ? "Hide" : "Show"}</span>
                          </Button>

                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/login" className="text-xs">
                              Manage Accounts
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Account Cards Grid (True to LifeHub AccountCard) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {/* Checking Account */}
                      <Card className="group relative transition-all duration-200 border hover:border-foreground/20 hover:shadow-xs">
                        <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                              <HugeiconsIcon icon={BankIcon} size={18} />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              Checking
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold truncate text-foreground">
                              Main Checking Account
                            </h4>
                            <p className="text-xl font-bold tracking-tight mt-1">
                              {showValues ? "$ 8,420.00" : "••••••"}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                            <span>18 transactions</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Savings Account */}
                      <Card className="group relative transition-all duration-200 border hover:border-foreground/20 hover:shadow-xs">
                        <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                              <HugeiconsIcon icon={PiggyBankIcon} size={18} />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              Savings
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold truncate text-foreground">
                              Emergency Reserve
                            </h4>
                            <p className="text-xl font-bold tracking-tight mt-1">
                              {showValues ? "$ 6,430.00" : "••••••"}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                            <span>6 transactions</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Credit Card Account */}
                      <Card className="group relative transition-all duration-200 border hover:border-foreground/20 hover:shadow-xs">
                        <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                              <HugeiconsIcon icon={CreditCardIcon} size={18} />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400">
                              Credit Card
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold truncate text-foreground">
                              Platinum Card
                            </h4>
                            <p className="text-xl font-bold tracking-tight mt-1 text-red-500">
                              {showValues ? "-$ 1,280.00" : "••••••"}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                            <span>12 transactions</span>
                            <span className="text-[10px]">Open Bill</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* 2. REAL TASKS & NOTES ROW PREVIEW */}
                {(activeTab === "all" || activeTab === "tasks" || activeTab === "notes") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Task Card 1 (Faithful to TaskCard component) */}
                    {(activeTab === "all" || activeTab === "tasks") && (
                      <Card className="w-full min-h-36 hover:shadow-md transition-shadow">
                        <CardContent className="h-full flex flex-col justify-between gap-3 p-4">
                          <div className="flex justify-between items-center">
                            <p className="text-base font-bold text-foreground">Deliver Q4 Financial Report</p>
                            <div className="flex items-center gap-1.5">
                              <div className="rounded-full w-2 h-2 bg-red-500" />
                              <span className="text-xs font-medium text-muted-foreground">High</span>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Consolidate bank statements, calculate expense metrics by category, and update projections.
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-border/40">
                            <div className="flex gap-1.5 items-center text-muted-foreground">
                              <HugeiconsIcon size={15} icon={Calendar03Icon} />
                              <span className="text-xs">Tomorrow</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <div className="rounded-full w-2 h-2 bg-yellow-500" />
                              <span className="text-xs font-medium">In progress</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Task Card 2 */}
                    {(activeTab === "tasks") && (
                      <Card className="w-full min-h-36 hover:shadow-md transition-shadow">
                        <CardContent className="h-full flex flex-col justify-between gap-3 p-4">
                          <div className="flex justify-between items-center">
                            <p className="text-base font-bold text-foreground">Review Monthly Subscriptions</p>
                            <div className="flex items-center gap-1.5">
                              <div className="rounded-full w-2 h-2 bg-green-500" />
                              <span className="text-xs font-medium text-muted-foreground">Low</span>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Audit active SaaS services, cancel unused tools, and adjust category limits.
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-border/40">
                            <div className="flex gap-1.5 items-center text-muted-foreground">
                              <HugeiconsIcon size={15} icon={Calendar03Icon} />
                              <span className="text-xs">Next week</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <div className="rounded-full w-2 h-2 bg-green-500" />
                              <span className="text-xs font-medium">Completed</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Note Card (Faithful to NoteCard component) */}
                    {(activeTab === "all" || activeTab === "notes") && (
                      <Card className="w-full min-h-36 hover:shadow-md transition-shadow bg-card">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base font-bold text-foreground">
                            Product Roadmap & Life Goals
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="px-4 pb-2">
                          <Card className="p-2.5 bg-muted/40 border border-border/60">
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              Automate investment tracking, organize weekly task sprints, and maintain an emergency reserve of 6 months.
                            </p>
                          </Card>

                          <div className="flex gap-1.5 mt-2.5 text-[11px] text-muted-foreground">
                            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">#finances</span>
                            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">#goals</span>
                            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">#planning</span>
                          </div>
                        </CardContent>

                        <CardFooter className="px-4 pt-1 pb-3 mt-auto">
                          <CardDescription className="ml-auto text-[11px]">
                            Updated today
                          </CardDescription>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CORE MODULES / FEATURES SECTION
        ========================================================================== */}
        <section id="features" className="py-20 border-t border-border/60 bg-muted/20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Integrated Pillars
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to run your life with clarity
              </p>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                No more context switching across disconnected apps. In LifeHub, every module works in harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1: Finance */}
              <Card className="relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
                    <HugeiconsIcon icon={BadgeDollarSignIcon} size={24} />
                  </div>
                  <CardTitle className="text-lg">Personal Finance</CardTitle>
                  <CardDescription>
                    Gain total visibility over cash flow and account balances.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span><strong>Multi-Account:</strong> Track checking, savings, credit cards, and cash in one view.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span><strong>Category Tracking:</strong> Categorize income and expenses with customizable colors.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span><strong>Consolidated Metrics:</strong> Real-time net balance calculation and monthly insights.</span>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2: Tasks */}
              <Card className="relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2">
                    <HugeiconsIcon icon={Task01Icon} size={24} />
                  </div>
                  <CardTitle className="text-lg">Task Management</CardTitle>
                  <CardDescription>
                    Execute goals with priorities, deadlines, and clear status tracking.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-blue-500 mt-0.5 shrink-0" />
                    <span><strong>Dynamic Priority:</strong> Classify tasks as Low, Medium, or High to protect focus.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-blue-500 mt-0.5 shrink-0" />
                    <span><strong>Due Dates:</strong> Group and filter tasks by Today, This Week, or Upcoming dates.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-blue-500 mt-0.5 shrink-0" />
                    <span><strong>Workflow States:</strong> Progress through Pending, In Progress, Completed, and Cancelled.</span>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3: Notes */}
              <Card className="relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2">
                    <HugeiconsIcon icon={Note01Icon} size={24} />
                  </div>
                  <CardTitle className="text-lg">Notes & Ideas</CardTitle>
                  <CardDescription>
                    Capture fast thoughts, meeting minutes, and reference materials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <span><strong>Tagging System:</strong> Organize and discover notes effortlessly with tag arrays.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <span><strong>Color Highlights:</strong> Assign colors to identify topics and priorities instantly.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <span><strong>Quick Editing:</strong> Distraction-free writing experience across desktop and mobile.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            TECH STACK SECTION
        ========================================================================== */}
        <section id="tech" className="py-20 border-t border-border/60">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Modern Engineering
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight">
                Built with industry-standard technologies
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Solid, scalable, and secure architecture designed for speed and reliability.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">Next.js 16</span>
                <span className="text-[11px] text-muted-foreground">App Router & RSC</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">NestJS 11</span>
                <span className="text-[11px] text-muted-foreground">Modular Architecture</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">PostgreSQL</span>
                <span className="text-[11px] text-muted-foreground">Neon Serverless DB</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">TypeORM</span>
                <span className="text-[11px] text-muted-foreground">Data Mapper & Migrations</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">TanStack Query</span>
                <span className="text-[11px] text-muted-foreground">Server State & Cache</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2">
                <span className="font-bold text-sm">Tailwind + shadcn</span>
                <span className="text-[11px] text-muted-foreground">Clean, Responsive UI</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CALL TO ACTION BANNER
        ========================================================================== */}
        <section className="py-16 border-t border-border/60 bg-muted/40">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-md">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Ready to take control of your routine?
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground sm:text-base">
                Sign up for LifeHub in seconds and keep your finances, tasks, and notes under total command.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="w-full sm:w-auto px-8 h-11 text-sm font-semibold" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <span>Create free account</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-11 text-sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          FOOTER
      ========================================================================== */}
      <footer className="border-t border-border/60 bg-background py-8 text-xs text-muted-foreground">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              LH
            </div>
            <span className="font-semibold text-foreground">LifeHub</span>
            <span>&copy; {new Date().getFullYear()} - All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
