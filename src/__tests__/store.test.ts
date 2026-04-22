import { describe, it, expect, beforeEach } from "vitest";
import { useProfileStore, DEFAULT_PLAN_ITEMS } from "../store/useProfileStore";

describe("useProfileStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useProfileStore.setState({
      profile: null,
      planProgress: {},
    });
  });

  it("should have initial state with null profile", () => {
    const state = useProfileStore.getState();
    expect(state.profile).toBeNull();
    expect(state.planProgress).toEqual({});
  });

  it("should set profile correctly", () => {
    const { setProfile } = useProfileStore.getState();
    const testProfile = {
      birthDate: "1970-01",
      gender: "male" as const,
      workerType: "worker" as const,
    };

    setProfile(testProfile);

    const state = useProfileStore.getState();
    expect(state.profile).toEqual(testProfile);
  });

  it("should clear profile and plan progress", () => {
    const { setProfile, togglePlanItem, clearProfile } = useProfileStore.getState();

    setProfile({
      birthDate: "1970-01",
      gender: "male",
      workerType: "worker",
    });
    togglePlanItem("prep-1");

    clearProfile();

    const state = useProfileStore.getState();
    expect(state.profile).toBeNull();
    expect(state.planProgress).toEqual({});
  });

  it("should toggle plan item status", () => {
    const { togglePlanItem } = useProfileStore.getState();

    togglePlanItem("prep-1");
    expect(useProfileStore.getState().planProgress["prep-1"]).toBe(true);

    togglePlanItem("prep-1");
    expect(useProfileStore.getState().planProgress["prep-1"]).toBe(false);
  });

  it("should set plan item status directly", () => {
    const { setPlanItemStatus } = useProfileStore.getState();

    setPlanItemStatus("prep-1", true);
    expect(useProfileStore.getState().planProgress["prep-1"]).toBe(true);

    setPlanItemStatus("prep-2", true);
    expect(useProfileStore.getState().planProgress["prep-2"]).toBe(true);

    setPlanItemStatus("prep-1", false);
    expect(useProfileStore.getState().planProgress["prep-1"]).toBe(false);
  });
});

describe("DEFAULT_PLAN_ITEMS", () => {
  it("should have items for all three phases", () => {
    const phases = DEFAULT_PLAN_ITEMS.map((item) => item.phase);
    expect(phases).toContain("preparation");
    expect(phases).toContain("processing");
    expect(phases).toContain("collection");
  });

  it("should have unique ids for all items", () => {
    const ids = DEFAULT_PLAN_ITEMS.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have valid structure for all items", () => {
    DEFAULT_PLAN_ITEMS.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("phase");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("completed");
      expect(typeof item.id).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.description).toBe("string");
    });
  });

  it("should have 12 items (4 per phase)", () => {
    expect(DEFAULT_PLAN_ITEMS.length).toBe(12);

    const preparationItems = DEFAULT_PLAN_ITEMS.filter(
      (item) => item.phase === "preparation"
    );
    const processingItems = DEFAULT_PLAN_ITEMS.filter(
      (item) => item.phase === "processing"
    );
    const collectionItems = DEFAULT_PLAN_ITEMS.filter(
      (item) => item.phase === "collection"
    );

    expect(preparationItems.length).toBe(4);
    expect(processingItems.length).toBe(4);
    expect(collectionItems.length).toBe(4);
  });
});
