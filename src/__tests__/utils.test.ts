import { describe, it, expect } from "vitest";
import {
  formatDate,
  parseYearMonth,
  yearMonthToDate,
  daysBetween,
  formatCountdown,
  cn,
} from "../lib/utils";

describe("formatDate", () => {
  it("should format date in Chinese format", () => {
    const date = new Date(2025, 5, 15); // June 15, 2025
    expect(formatDate(date)).toBe("2025年6月");
  });

  it("should handle month with leading zero", () => {
    const date = new Date(2025, 0, 1); // January 1, 2025
    expect(formatDate(date)).toBe("2025年1月");
  });
});

describe("parseYearMonth", () => {
  it("should parse valid YYYY-MM string", () => {
    const result = parseYearMonth("2025-06");
    expect(result).toEqual({ year: 2025, month: 6 });
  });

  it("should parse month with leading zero", () => {
    const result = parseYearMonth("2025-01");
    expect(result).toEqual({ year: 2025, month: 1 });
  });

  it("should return null for invalid format", () => {
    expect(parseYearMonth("invalid")).toBeNull();
    expect(parseYearMonth("2025")).toBeNull();
    expect(parseYearMonth("2025/06")).toBeNull();
    expect(parseYearMonth("")).toBeNull();
  });
});

describe("yearMonthToDate", () => {
  it("should convert YYYY-MM string to Date", () => {
    const result = yearMonthToDate("2025-06");
    expect(result).toEqual(new Date(2025, 5, 1));
  });

  it("should return null for invalid format", () => {
    expect(yearMonthToDate("invalid")).toBeNull();
    expect(yearMonthToDate("")).toBeNull();
  });
});

describe("daysBetween", () => {
  it("should calculate days between two dates", () => {
    const date1 = new Date(2025, 0, 1);
    const date2 = new Date(2025, 0, 31);
    expect(daysBetween(date1, date2)).toBe(30);
  });

  it("should handle reversed dates", () => {
    const date1 = new Date(2025, 0, 31);
    const date2 = new Date(2025, 0, 1);
    expect(daysBetween(date1, date2)).toBe(30);
  });

  it("should return 0 for same date", () => {
    const date = new Date(2025, 0, 15);
    expect(daysBetween(date, date)).toBe(0);
  });

  it("should handle year boundaries", () => {
    const date1 = new Date(2024, 11, 31);
    const date2 = new Date(2025, 0, 1);
    expect(daysBetween(date1, date2)).toBe(1);
  });
});

describe("formatCountdown", () => {
  it("should format countdown for 1 year", () => {
    const result = formatCountdown(365);
    expect(result.years).toBe(1);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
    expect(result.totalDays).toBe(365);
  });

  it("should format countdown for mixed values", () => {
    const result = formatCountdown(400);
    expect(result.years).toBe(1);
    expect(result.months >= 1).toBe(true);
    expect(result.totalDays).toBe(400);
  });

  it("should handle 0 days", () => {
    const result = formatCountdown(0);
    expect(result.years).toBe(0);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
    expect(result.totalDays).toBe(0);
  });
});

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should handle undefined values", () => {
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
