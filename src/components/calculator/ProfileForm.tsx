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
import { CalendarDays, User, Briefcase } from "lucide-react";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialValues?: UserProfile;
}

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
    <Card className="w-full">
      {/* Gold accent top bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gold)]/10 to-[var(--gold)]/5 flex items-center justify-center mb-3">
          <CalendarDays className="w-8 h-8 text-[var(--gold)]" />
        </div>
        <CardTitle className="font-display text-2xl sm:text-3xl">
          退休信息录入
        </CardTitle>
        <p className="text-muted-foreground text-base mt-1">
          输入您的基本信息，计算精确退休时间
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 出生年月 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold font-display">
              <CalendarDays className="w-5 h-5 text-[var(--gold)]" />
              出生年月
            </label>
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
                <SelectTrigger className="w-28 sm:w-32">
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
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold font-display">
              <User className="w-5 h-5 text-[var(--gold)]" />
              性别
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`
                  relative h-14 rounded-xl text-lg font-medium transition-all duration-300
                  ${gender === "male"
                    ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-white shadow-[var(--shadow-warm)]"
                    : "border-2 border-[var(--gold)]/20 bg-transparent hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5"
                  }
                `}
              >
                男
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`
                  relative h-14 rounded-xl text-lg font-medium transition-all duration-300
                  ${gender === "female"
                    ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-white shadow-[var(--shadow-warm)]"
                    : "border-2 border-[var(--gold)]/20 bg-transparent hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5"
                  }
                `}
              >
                女
              </button>
            </div>
          </div>

          {/* 身份类型（仅女性显示） */}
          {gender === "female" && (
            <div className="space-y-3 animate-fade-in">
              <label className="flex items-center gap-2 text-lg font-semibold font-display">
                <Briefcase className="w-5 h-5 text-[var(--gold)]" />
                身份类型
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWorkerType("worker")}
                  className={`
                    relative h-14 rounded-xl text-lg font-medium transition-all duration-300
                    ${workerType === "worker"
                      ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-white shadow-[var(--shadow-warm)]"
                      : "border-2 border-[var(--gold)]/20 bg-transparent hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5"
                    }
                  `}
                >
                  工人
                </button>
                <button
                  type="button"
                  onClick={() => setWorkerType("cadre")}
                  className={`
                    relative h-14 rounded-xl text-lg font-medium transition-all duration-300
                    ${workerType === "cadre"
                      ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-white shadow-[var(--shadow-warm)]"
                      : "border-2 border-[var(--gold)]/20 bg-transparent hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5"
                    }
                  `}
                >
                  干部
                </button>
              </div>
            </div>
          )}

          {/* 提交按钮 */}
          <Button type="submit" size="lg" className="w-full text-xl font-display tracking-wider">
            计算退休时间
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
