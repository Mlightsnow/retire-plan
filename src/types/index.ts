// 用户档案
export interface UserProfile {
  birthDate: string; // YYYY-MM
  gender: "male" | "female";
  workerType: "worker" | "cadre"; // 身份类型：工人/干部
  location?: string;
  insuranceYears?: number; // 已缴费年限
}

// 退休计算结果
export interface RetirementResult {
  originalRetireDate: string; // 原法定退休日期
  newRetireDate: string; // 新法定退休日期
  delayMonths: number; // 延迟月数
  countdown: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
  };
}

// 政策卡片
export interface PolicyCard {
  id: string;
  category: "pension" | "medical" | "process"; // 养老金/医保/办理流程
  title: string;
  content: string; // Markdown format
  summary: string;
  tags: string[];
  region: string;
  isPinned?: boolean;
}

// 计划任务项
export interface PlanItem {
  id: string;
  phase: "preparation" | "processing" | "collection"; // 筹备期/办理期/领取期
  title: string;
  description: string;
  completed: boolean;
}
