"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PolicyCard } from "@/types";
import { Search, Pin } from "lucide-react";

interface PolicyListProps {
  policies: PolicyCard[];
}

const categoryLabels: Record<PolicyCard["category"], string> = {
  pension: "养老金",
  medical: "医保",
  process: "办理流程",
};

export function PolicyList({ policies }: PolicyListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<PolicyCard["category"] | "all">(
    "all"
  );
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory = activeTab === "all" || policy.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  // 排序：置顶的在前
  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    const aPinned = pinnedIds.has(a.id) || a.isPinned;
    const bPinned = pinnedIds.has(b.id) || b.isPinned;
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="搜索政策..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
      </div>

      {/* 分类标签 */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            全部
          </TabsTrigger>
          <TabsTrigger value="pension" className="flex-1">
            养老金
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex-1">
            医保
          </TabsTrigger>
          <TabsTrigger value="process" className="flex-1">
            办理流程
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          {sortedPolicies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              没有找到相关政策
            </div>
          ) : (
            sortedPolicies.map((policy) => (
              <Card key={policy.id} className="relative">
                <button
                  onClick={() => togglePin(policy.id)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-md"
                  aria-label={pinnedIds.has(policy.id) ? "取消置顶" : "置顶"}
                >
                  <Pin
                    className={`h-5 w-5 ${
                      pinnedIds.has(policy.id) || policy.isPinned
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {categoryLabels[policy.category]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {policy.region}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{policy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    {policy.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {policy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-secondary px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
