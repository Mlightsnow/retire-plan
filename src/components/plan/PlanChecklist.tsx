"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfileStore, DEFAULT_PLAN_ITEMS } from "@/store/useProfileStore";
import { PlanItem } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";

const phaseLabels: Record<PlanItem["phase"], { title: string; description: string }> = {
  preparation: {
    title: "筹备期",
    description: "退休前 5 年开始准备",
  },
  processing: {
    title: "办理期",
    description: "退休前 6 个月",
  },
  collection: {
    title: "领取期",
    description: "退休后",
  },
};

interface PlanChecklistProps {
  activePhase?: PlanItem["phase"];
}

export function PlanChecklist({ activePhase }: PlanChecklistProps) {
  const { planProgress, togglePlanItem } = useProfileStore();

  // 根据 activePhase 过滤显示的项目
  const displayItems = activePhase
    ? DEFAULT_PLAN_ITEMS.filter((item) => item.phase === activePhase)
    : DEFAULT_PLAN_ITEMS;

  // 按阶段分组
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

  // 计算进度
  const totalItems = displayItems.length;
  const completedItems = displayItems.filter(
    (item) => planProgress[item.id]
  ).length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 总体进度 */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">整体进度</span>
            <span className="text-lg text-muted-foreground">
              {completedItems}/{totalItems}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary rounded-full h-3 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* 各阶段任务 */}
      {(["preparation", "processing", "collection"] as const).map((phase) => {
        const items = groupedItems[phase];
        if (!items || items.length === 0) return null;

        const phaseCompleted = items.filter(
          (item) => planProgress[item.id]
        ).length;
        const allCompleted = phaseCompleted === items.length;

        return (
          <Card key={phase}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {allCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
                <div>
                  <CardTitle>{phaseLabels[phase].title}</CardTitle>
                  <p className="text-base text-muted-foreground">
                    {phaseLabels[phase].description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={item.id}
                    checked={planProgress[item.id] || false}
                    onCheckedChange={() => togglePlanItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={item.id}
                      className={`text-lg font-medium cursor-pointer ${
                        planProgress[item.id] ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {item.title}
                    </label>
                    <p className="text-base text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
