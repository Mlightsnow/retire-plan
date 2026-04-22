import { describe, it, expect } from "vitest";
import { calculateRetirement, getCurrentPhase } from "../lib/retirement";
import { UserProfile } from "@/types";

describe("calculateRetirement", () => {
  it("should return null for invalid birthDate format", () => {
    const profile: UserProfile = {
      birthDate: "invalid",
      gender: "male",
      workerType: "worker",
    };
    expect(calculateRetirement(profile)).toBeNull();
  });

  it("should calculate original retirement date for male worker", () => {
    const profile: UserProfile = {
      birthDate: "1970-06",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(result).not.toBeNull();
    expect(result!.originalRetireDate).toBe("2030年6月");
  });

  it("should calculate original retirement date for female cadre", () => {
    const profile: UserProfile = {
      birthDate: "1970-06",
      gender: "female",
      workerType: "cadre",
    };
    const result = calculateRetirement(profile);
    expect(result).not.toBeNull();
    expect(result!.originalRetireDate).toBe("2025年6月");
  });

  it("should calculate original retirement date for female worker", () => {
    const profile: UserProfile = {
      birthDate: "1975-06",
      gender: "female",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(result).not.toBeNull();
    expect(result!.originalRetireDate).toBe("2025年6月");
  });

  it("should return delayMonths as 0 (placeholder)", () => {
    // 当前实现返回 0，等待用户提供具体参数后更新测试
    const profile: UserProfile = {
      birthDate: "1970-06",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(result!.delayMonths).toBe(0);
  });

  it("should calculate new retirement date correctly", () => {
    const profile: UserProfile = {
      birthDate: "1970-06",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    // 当前延迟为0，所以新日期应该等于原日期
    expect(result!.newRetireDate).toBe(result!.originalRetireDate);
  });

  it("should return positive countdown for future retirement", () => {
    const profile: UserProfile = {
      birthDate: "1990-01",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(result!.countdown.totalDays).toBeGreaterThan(0);
  });

  it("should handle birth date with leading zero in month", () => {
    const profile: UserProfile = {
      birthDate: "1970-01",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(result).not.toBeNull();
    expect(result!.originalRetireDate).toBe("2030年1月");
  });

  it("should return countdown with years, months, and days", () => {
    const profile: UserProfile = {
      birthDate: "1980-01",
      gender: "male",
      workerType: "worker",
    };
    const result = calculateRetirement(profile);
    expect(typeof result!.countdown.years).toBe("number");
    expect(typeof result!.countdown.months).toBe("number");
    expect(typeof result!.countdown.days).toBe("number");
    expect(typeof result!.countdown.totalDays).toBe("number");
  });
});

describe("getCurrentPhase", () => {
  it("should return null for invalid birthDate", () => {
    const profile: UserProfile = {
      birthDate: "invalid",
      gender: "male",
      workerType: "worker",
    };
    expect(getCurrentPhase(profile)).toBeNull();
  });

  it("should return preparation phase for young workers", () => {
    const profile: UserProfile = {
      birthDate: "1990-01",
      gender: "male",
      workerType: "worker",
    };
    // 距离退休还有很多年，应该在筹备期
    expect(getCurrentPhase(profile)).toBe("preparation");
  });

  it("should return collection phase for already retired", () => {
    const profile: UserProfile = {
      birthDate: "1950-01",
      gender: "male",
      workerType: "worker",
    };
    // 已过退休年龄
    expect(getCurrentPhase(profile)).toBe("collection");
  });
});
