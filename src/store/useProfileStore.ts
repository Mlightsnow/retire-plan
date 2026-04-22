import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, PlanItem } from "@/types";

interface ProfileState {
  profile: UserProfile | null;
  planProgress: Record<string, boolean>;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  togglePlanItem: (id: string) => void;
  setPlanItemStatus: (id: string, completed: boolean) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      planProgress: {},

      setProfile: (profile) => set({ profile }),

      clearProfile: () =>
        set({
          profile: null,
          planProgress: {},
        }),

      togglePlanItem: (id) =>
        set((state) => ({
          planProgress: {
            ...state.planProgress,
            [id]: !state.planProgress[id],
          },
        })),

      setPlanItemStatus: (id, completed) =>
        set((state) => ({
          planProgress: {
            ...state.planProgress,
            [id]: completed,
          },
        })),
    }),
    {
      name: "retire-plan-storage",
    }
  )
);

// 默认计划项目录
export const DEFAULT_PLAN_ITEMS: PlanItem[] = [
  // 筹备期（退休前 5 年）
  {
    id: "prep-1",
    phase: "preparation",
    title: "核查社保缴费年限",
    description: "登录社保局网站或APP，确认累计缴费年限是否满足最低要求",
    completed: false,
  },
  {
    id: "prep-2",
    phase: "preparation",
    title: "确认人事档案位置",
    description: "联系原单位或人才中心，确认档案存放地点",
    completed: false,
  },
  {
    id: "prep-3",
    phase: "preparation",
    title: "咨询补缴政策",
    description: "如缴费年限不足，咨询当地社保局补缴条件和流程",
    completed: false,
  },
  {
    id: "prep-4",
    phase: "preparation",
    title: "核对个人信息",
    description: "确保身份证、户口本信息与社保记录一致",
    completed: false,
  },

  // 办理期（退休前 6 个月）
  {
    id: "proc-1",
    phase: "processing",
    title: "准备退休申请材料",
    description: "身份证、户口本、社保卡、档案等",
    completed: false,
  },
  {
    id: "proc-2",
    phase: "processing",
    title: "前往社保经办机构",
    description: "携带材料到参保地社保经办机构办理退休手续",
    completed: false,
  },
  {
    id: "proc-3",
    phase: "processing",
    title: "填写退休申请表",
    description: "如实填写个人信息、工作经历等",
    completed: false,
  },
  {
    id: "proc-4",
    phase: "processing",
    title: "等待审批结果",
    description: "一般需要15-30个工作日",
    completed: false,
  },

  // 领取期（退休后）
  {
    id: "coll-1",
    phase: "collection",
    title: "激活社保卡金融功能",
    description: "到银行激活社保卡的金融账户，用于领取养老金",
    completed: false,
  },
  {
    id: "coll-2",
    phase: "collection",
    title: "完成待遇资格认证",
    description: "通过APP或现场完成年度养老金领取资格认证",
    completed: false,
  },
  {
    id: "coll-3",
    phase: "collection",
    title: "了解医保待遇",
    description: "退休后医保报销比例提高，了解具体政策",
    completed: false,
  },
  {
    id: "coll-4",
    phase: "collection",
    title: "规划退休生活",
    description: "合理安排退休金，规划健康生活",
    completed: false,
  },
];

// 获取特定阶段的计划项
export function getPlanItemsByPhase(phase: PlanItem["phase"]): PlanItem[] {
  return DEFAULT_PLAN_ITEMS.filter((item) => item.phase === phase);
}
