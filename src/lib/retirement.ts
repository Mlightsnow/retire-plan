import {
  UserProfile,
  RetirementResult,
} from "@/types";
import {
  yearMonthToDate,
  daysBetween,
  formatCountdown,
  formatDate,
} from "./utils";

/**
 * 原法定退休年龄
 */
const ORIGINAL_RETIREMENT_AGE = {
  male: 60, // 男职工
  female_cadre: 55, // 女干部
  female_worker: 50, // 女工人
};

/**
 * 计算原法定退休日期
 */
function calculateOriginalRetireDate(
  birthDate: Date,
  gender: "male" | "female",
  workerType: "worker" | "cadre"
): Date {
  let retireAge: number;

  if (gender === "male") {
    retireAge = ORIGINAL_RETIREMENT_AGE.male;
  } else {
    retireAge =
      workerType === "cadre"
        ? ORIGINAL_RETIREMENT_AGE.female_cadre
        : ORIGINAL_RETIREMENT_AGE.female_worker;
  }

  const retireDate = new Date(birthDate);
  retireDate.setFullYear(retireDate.getFullYear() + retireAge);
  return retireDate;
}

/**
 * 计算延迟月数
 *
 * TODO: 根据用户提供的具体参数实现
 * 当前为占位逻辑，等待用户提供：
 * - 男职工延迟规则（每X个月延迟1个月，封顶Y个月）
 * - 女干部延迟规则
 * - 女工人延迟规则
 * - 过渡期起始时间
 */
function calculateDelayMonths(
  _birthDate: Date,
  _gender: "male" | "female",
  _workerType: "worker" | "cadre"
): number {
  // 占位逻辑：返回 0，等待具体参数后实现
  // 实际实现需要根据出生日期和渐进式延迟规则计算
  return 0;
}

/**
 * 计算退休结果
 *
 * @param profile 用户档案
 * @returns 退休计算结果
 */
export function calculateRetirement(profile: UserProfile): RetirementResult | null {
  const birthDate = yearMonthToDate(profile.birthDate);
  if (!birthDate) return null;

  const originalRetireDate = calculateOriginalRetireDate(
    birthDate,
    profile.gender,
    profile.workerType
  );

  const delayMonths = calculateDelayMonths(
    birthDate,
    profile.gender,
    profile.workerType
  );

  // 计算新退休日期
  const newRetireDate = new Date(originalRetireDate);
  newRetireDate.setMonth(newRetireDate.getMonth() + delayMonths);

  // 计算倒计时
  const today = new Date();
  const totalDays = Math.max(0, daysBetween(today, newRetireDate));

  return {
    originalRetireDate: formatDate(originalRetireDate),
    newRetireDate: formatDate(newRetireDate),
    delayMonths,
    countdown: formatCountdown(totalDays),
  };
}

/**
 * 获取用户当前所处阶段
 */
export function getCurrentPhase(
  profile: UserProfile
): "preparation" | "processing" | "collection" | null {
  const birthDate = yearMonthToDate(profile.birthDate);
  if (!birthDate) return null;

  // 计算退休日期
  const retireDate = calculateOriginalRetireDate(
    birthDate,
    profile.gender,
    profile.workerType
  );

  // 计算延迟月数并调整退休日期
  const delayMonths = calculateDelayMonths(birthDate, profile.gender, profile.workerType);
  retireDate.setMonth(retireDate.getMonth() + delayMonths);

  const today = new Date();

  // 计算距离退休的月数
  const monthsToRetire =
    (retireDate.getFullYear() - today.getFullYear()) * 12 +
    (retireDate.getMonth() - today.getMonth());

  if (monthsToRetire <= 0) {
    return "collection"; // 已退休
  } else if (monthsToRetire <= 6) {
    return "processing"; // 办理期
  } else {
    return "preparation"; // 筹备期
  }
}
