"use client";

import { useState, useEffect } from "react";
import { ProfileForm } from "@/components/calculator/ProfileForm";
import { RetirementResult } from "@/components/calculator/RetirementResult";
import { PolicyList } from "@/components/policy/PolicyList";
import { PlanChecklist } from "@/components/plan/PlanChecklist";
import { ThemeToggle } from "@/components/ui/switch";
import { useProfileStore } from "@/store/useProfileStore";
import { calculateRetirement, getCurrentPhase } from "@/lib/retirement";
import { UserProfile, PolicyCard, RetirementResult as RetirementResultType } from "@/types";
import { Calculator, BookOpen, ClipboardList, RefreshCw, Sparkles } from "lucide-react";
import rawPolicies from "@/data/policies.json";

const policies = rawPolicies as PolicyCard[];

type TabType = "calculator" | "policy" | "plan";

const tabConfig = [
  { id: "calculator" as const, label: "退休计算", icon: Calculator },
  { id: "policy" as const, label: "政策知识库", icon: BookOpen },
  { id: "plan" as const, label: "我的计划", icon: ClipboardList },
];

export default function Home() {
  const { profile, setProfile, clearProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState<TabType>("calculator");
  const [result, setResult] = useState<RetirementResultType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (profile) {
      const calculatedResult = calculateRetirement(profile);
      setResult(calculatedResult);
    } else {
      setResult(null);
    }
  }, [profile]);

  const handleSubmit = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const handleReset = () => {
    clearProfile();
    setResult(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 - 墨金风格 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[var(--gold)] animate-pulse" />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold tracking-wide">
                  退休规划助手
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  精准规划，安心退休
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="animate-fade-in-up">
          {/* 计算器 */}
          {activeTab === "calculator" && (
            <div className="space-y-6 max-w-lg mx-auto">
              {!profile ? (
                <ProfileForm onSubmit={handleSubmit} />
              ) : (
                <div className="space-y-5">
                  {result && <RetirementResult result={result} />}
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-border bg-card hover:bg-muted/50 transition-all duration-300 text-lg font-medium group"
                  >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>重新计算</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 政策知识库 */}
          {activeTab === "policy" && <PolicyList policies={policies} />}

          {/* 个人计划 */}
          {activeTab === "plan" && (
            <PlanChecklist activePhase={profile ? getCurrentPhase(profile) || undefined : undefined} />
          )}
        </div>
      </main>

      {/* 底部导航 - 优雅金边 */}
      <nav className="sticky bottom-0 border-t border-border/50 bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-around py-2 sm:py-3">
            {tabConfig.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    relative flex flex-col items-center gap-1 py-2 px-4 sm:px-6 rounded-xl transition-all duration-300
                    ${isActive
                      ? "text-[var(--gold)]"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--gold)]/10 to-transparent border border-[var(--gold)]/20" />
                  )}
                  <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                  <span className="text-sm sm:text-base font-medium relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
