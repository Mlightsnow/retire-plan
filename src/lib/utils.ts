import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期为中文格式
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月`;
}

/**
 * 从 YYYY-MM 字符串解析年月
 */
export function parseYearMonth(dateStr: string): { year: number; month: number } | null {
  const match = dateStr.match(/^(\d{4})-(\d{2})$/);
  if (!match) return null;
  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
  };
}

/**
 * 年月转换为 Date 对象（设为当月第一天）
 */
export function yearMonthToDate(dateStr: string): Date | null {
  const parsed = parseYearMonth(dateStr);
  if (!parsed) return null;
  return new Date(parsed.year, parsed.month - 1, 1);
}

/**
 * 计算两个日期之间的天数差
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
}

/**
 * 格式化倒计时
 */
export function formatCountdown(totalDays: number): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  const years = Math.floor(totalDays / 365);
  const remainingDays = totalDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  return { years, months, days, totalDays };
}
