"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/components/calculator/ProfileForm";
import { RetirementResult } from "@/components/calculator/RetirementResult";
import { PolicyList } from "@/components/policy/PolicyList";
import { PlanChecklist } from "@/components/plan/PlanChecklist";
import { ThemeToggle } from "@/components/ui/switch";
import { useProfileStore } from "@/store/useProfileStore";
import { calculateRetirement, getCurrentPhase } from "@/lib/retirement";
import { UserProfile, PolicyCard, RetirementResult as RetirementResultType } from "@/types";
import { Calculator, BookOpen, ClipboardList, RefreshCw } from "lucide-react";
import rawPolicies from "@/data/policies.json";

const policies = rawPolicies as PolicyCard[];

type TabType = "calculator" | "policy" | "plan";

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
    return null; // 防止 hydration 错误
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">退休规划助手</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* 计算器 */}
        {activeTab === "calculator" && (
          <div className="space-y-6">
            {!profile ? (
              <ProfileForm onSubmit={handleSubmit} />
            ) : (
              <div className="space-y-4">
                {result && <RetirementResult result={result} />}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full max-w-md mx-auto block"
                  onClick={handleReset}
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  重新计算
                </Button>
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
      </main>

      {/* 底部导航 */}
      <nav className="sticky bottom-0 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === "calculator"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calculator className="h-6 w-6 mb-1" />
              <span className="text-base">计算器</span>
            </button>
            <button
              onClick={() => setActiveTab("policy")}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === "policy"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="h-6 w-6 mb-1" />
              <span className="text-base">政策库</span>
            </button>
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === "plan"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ClipboardList className="h-6 w-6 mb-1" />
              <span className="text-base">我的计划</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
