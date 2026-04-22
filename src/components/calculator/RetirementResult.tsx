"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RetirementResult as RetirementResultType } from "@/types";
import { Clock, Calendar, Sparkles } from "lucide-react";

interface RetirementResultProps {
  result: RetirementResultType;
}

export function RetirementResult({ result }: RetirementResultProps) {
  const { originalRetireDate, newRetireDate, delayMonths, countdown } = result;

  return (
    <Card className="w-full overflow-visible">
      {/* Decorative gold gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--gold)]/5 to-transparent pointer-events-none" />

      <CardHeader className="text-center relative">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center shadow-[var(--shadow-warm)]">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="font-display text-2xl sm:text-3xl mt-3">
          退休计算结果
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* 延迟月数 */}
        {delayMonths > 0 && (
          <div className="bg-gradient-to-r from-[var(--gold)]/10 via-[var(--gold)]/5 to-[var(--gold)]/10 rounded-2xl p-5 text-center border border-[var(--gold)]/20">
            <p className="text-base text-muted-foreground mb-1">延迟退休</p>
            <p className="text-5xl font-bold font-display text-[var(--gold)]">
              {delayMonths}
              <span className="text-2xl ml-1">个月</span>
            </p>
          </div>
        )}

        {/* 日期对比 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">原退休日期</span>
            </div>
            <p className="text-xl font-semibold font-display">{originalRetireDate}</p>
          </div>
          <div className="bg-gradient-to-br from-[var(--gold)]/10 to-[var(--gold)]/5 rounded-xl p-4 text-center border border-[var(--gold)]/20">
            <div className="flex items-center justify-center gap-1.5 mb-2 text-[var(--gold)]">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">新退休日期</span>
            </div>
            <p className="text-xl font-semibold font-display text-[var(--gold)]">
              {newRetireDate}
            </p>
          </div>
        </div>

        {/* 倒计时 */}
        <div className="relative bg-gradient-to-br from-[var(--gold)] via-[var(--gold-deep)] to-[var(--gold)] rounded-2xl p-6 text-white overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white blur-2xl" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <span className="text-lg opacity-90">距离退休还有</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl py-4 backdrop-blur-sm">
                <p className="text-4xl sm:text-5xl font-bold font-display">{countdown.years}</p>
                <p className="text-base opacity-80 mt-1">年</p>
              </div>
              <div className="bg-white/10 rounded-xl py-4 backdrop-blur-sm">
                <p className="text-4xl sm:text-5xl font-bold font-display">{countdown.months}</p>
                <p className="text-base opacity-80 mt-1">月</p>
              </div>
              <div className="bg-white/10 rounded-xl py-4 backdrop-blur-sm">
                <p className="text-4xl sm:text-5xl font-bold font-display">{countdown.days}</p>
                <p className="text-base opacity-80 mt-1">天</p>
              </div>
            </div>

            <p className="text-center text-sm opacity-70 mt-4">
              共计 {countdown.totalDays.toLocaleString()} 天
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
