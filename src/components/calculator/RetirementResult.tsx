"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RetirementResult as RetirementResultType } from "@/types";

interface RetirementResultProps {
  result: RetirementResultType;
}

export function RetirementResult({ result }: RetirementResultProps) {
  const { originalRetireDate, newRetireDate, delayMonths, countdown } = result;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">退休计算结果</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 延迟月数 */}
        {delayMonths > 0 && (
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-lg text-muted-foreground">延迟退休</p>
            <p className="text-4xl font-bold text-primary">{delayMonths}个月</p>
          </div>
        )}

        {/* 日期对比 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-base text-muted-foreground mb-1">原退休日期</p>
            <p className="text-xl font-semibold">{originalRetireDate}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-base text-muted-foreground mb-1">新退休日期</p>
            <p className="text-xl font-semibold text-primary">
              {newRetireDate}
            </p>
          </div>
        </div>

        {/* 倒计时 */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6">
          <p className="text-center text-lg text-muted-foreground mb-3">
            距离退休还有
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">{countdown.years}</p>
              <p className="text-base text-muted-foreground">年</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{countdown.months}</p>
              <p className="text-base text-muted-foreground">月</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{countdown.days}</p>
              <p className="text-base text-muted-foreground">天</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">
            共计 {countdown.totalDays.toLocaleString()} 天
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
