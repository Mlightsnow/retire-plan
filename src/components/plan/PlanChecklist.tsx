"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfileStore, DEFAULT_PLAN_ITEMS } from "@/store/useProfileStore";
import { PlanItem } from "@/types";
import { CheckCircle2, Circle, Target, FileCheck, Wallet } from "lucide-react";

const phaseConfig: Record<PlanItem["phase"], {
  title: string;
  description: string;
  icon: typeof Target;
  gradient: string;
}> = {
  preparation: {
    title: "筹备期",
    description: "退休前 5 年开始准备",
    icon: Target,
    gradient: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
  },
  processing: {
    title: "办理期",
    description: "退休前 6 个月",
    icon: FileCheck,
    gradient: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
  },
  collection: {
    title: "领取期",
    description: "退休后",
    icon: Wallet,
    gradient: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
  },
};

interface PlanChecklistProps {
  activePhase?: PlanItem["phase"];
}

export function PlanChecklist({ activePhase }: PlanChecklistProps) {
  const { planProgress, togglePlanItem } = useProfileStore();

  const displayItems = activePhase
    ? DEFAULT_PLAN_ITEMS.filter((item) => item.phase === activePhase)
    : DEFAULT_PLAN_ITEMS;

  const groupedItems = displayItems.reduce(
    (acc, item) => {
      if (!acc[item.phase]) {
        acc[item.phase] = [];
      }
      acc[item.phase].push(item);
      return acc;
    },
    {} as Record<PlanItem["phase"], PlanItem[]>
  );

  const totalItems = displayItems.length;
  const completedItems = displayItems.filter(
    (item) => planProgress[item.id]
  ).length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 总体进度 */}
      <Card className="overflow-hidden">
        <CardContent className="py-5 relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 via-transparent to-[var(--gold)]/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                整体进度
              </span>
              <span className="text-xl font-bold text-[var(--gold)]">
                {completedItems}/{totalItems}
              </span>
            </div>

            <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer effect */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-2">
              已完成 {Math.round(progress)}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 各阶段任务 */}
      {(["preparation", "processing", "collection"] as const).map((phase) => {
        const items = groupedItems[phase];
        if (!items || items.length === 0) return null;

        const config = phaseConfig[phase];
        const PhaseIcon = config.icon;
        const phaseCompleted = items.filter((item) => planProgress[item.id]).length;
        const allCompleted = phaseCompleted === items.length;

        return (
          <Card
            key={phase}
            className={`relative overflow-hidden transition-all duration-300 ${
              allCompleted ? "opacity-80" : ""
            }`}
          >
            {/* Phase gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} pointer-events-none`} />

            <CardHeader className="relative z-10">
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${allCompleted
                    ? "bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-white"
                    : "bg-card/80 text-muted-foreground"
                  }
                  shadow-sm transition-all duration-300
                `}>
                  {allCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <PhaseIcon className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-display">{config.title}</CardTitle>
                  <p className="text-base text-muted-foreground mt-0.5">
                    {config.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${allCompleted ? "text-[var(--gold)]" : "text-muted-foreground"}`}>
                    {phaseCompleted}
                  </span>
                  <span className="text-muted-foreground">/{items.length}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 relative z-10">
              {items.map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className={`
                    flex items-start gap-4 p-4 rounded-xl cursor-pointer
                    transition-all duration-300
                    ${planProgress[item.id]
                      ? "bg-[var(--gold)]/5"
                      : "bg-card/50 hover:bg-muted/50"
                    }
                  `}
                >
                  <Checkbox
                    id={item.id}
                    checked={planProgress[item.id] || false}
                    onCheckedChange={() => togglePlanItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-lg font-medium transition-all duration-300 ${
                      planProgress[item.id] ? "line-through text-muted-foreground" : ""
                    }`}>
                      {item.title}
                    </p>
                    <p className="text-base text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
