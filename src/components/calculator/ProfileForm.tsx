"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProfile } from "@/types";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialValues?: UserProfile;
}

// 生成年份选项 (1950-2000)
const years = Array.from({ length: 51 }, (_, i) => 1950 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

export function ProfileForm({ onSubmit, initialValues }: ProfileFormProps) {
  const [birthYear, setBirthYear] = useState<string>(
    initialValues?.birthDate?.split("-")[0] || ""
  );
  const [birthMonth, setBirthMonth] = useState<string>(
    initialValues?.birthDate?.split("-")[1] || ""
  );
  const [gender, setGender] = useState<"male" | "female">(
    initialValues?.gender || "male"
  );
  const [workerType, setWorkerType] = useState<"worker" | "cadre">(
    initialValues?.workerType || "worker"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthYear || !birthMonth) return;

    const monthStr = birthMonth.padStart(2, "0");
    onSubmit({
      birthDate: `${birthYear}-${monthStr}`,
      gender,
      workerType,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">退休信息录入</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 出生年月 */}
          <div className="space-y-2">
            <label className="text-lg font-medium">出生年月</label>
            <div className="flex gap-3">
              <Select value={birthYear} onValueChange={setBirthYear}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="年份" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={birthMonth} onValueChange={setBirthMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="月份" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}月
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 性别 */}
          <div className="space-y-2">
            <label className="text-lg font-medium">性别</label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={gender === "male" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setGender("male")}
              >
                男
              </Button>
              <Button
                type="button"
                variant={gender === "female" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setGender("female")}
              >
                女
              </Button>
            </div>
          </div>

          {/* 身份类型（仅女性显示） */}
          {gender === "female" && (
            <div className="space-y-2">
              <label className="text-lg font-medium">身份类型</label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={workerType === "worker" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setWorkerType("worker")}
                >
                  工人
                </Button>
                <Button
                  type="button"
                  variant={workerType === "cadre" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setWorkerType("cadre")}
                >
                  干部
                </Button>
              </div>
            </div>
          )}

          {/* 提交按钮 */}
          <Button type="submit" size="lg" className="w-full">
            计算退休时间
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
