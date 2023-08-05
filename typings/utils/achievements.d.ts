import { GamePatchData, ItemData, TitleData } from "./item";
import { SearchResult } from "./search";

export interface AchievementsData {
  List: { Date: number; ID: number }[];
  Points: number;
}

export interface AchievementCategoryData {
  AchievementsKind: {
    ID: number;
    Name: string;
    Name_de: string;
    Name_en: string;
    Name_fr: string;
    Name_ja: string;
    Order: number;
  };
  AchievementKindTarget: string;
  AchievementKindTargetID: number;
  HideCategory: number;
  ID: number;
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
  Order: number;
  ShowComplete: number;
}

export interface AchievementGetResult {
  AchievementCategory: AchievementCategoryData;
  AchievementCategoryTarget: string;
  AchievementCategoryTargetID: number;
  AchievementHideCondition: string | null;
  AchievementHideConditionTarget: string;
  AchievementHideConditionTargetID: number;
  AchievementTarget: { ID: number; Type: 1; Value: number } | null;
  AchievementTargetID: number | null;
  ClassJobRequirements: {}[];
  Data0: number;
  Data1: number;
  Data2: number;
  Data3: number;
  Data4: number;
  Data5: number;
  Data6: number;
  Data7: number;
  Description: string;
  Description_de: string;
  Description_en: string;
  Description_fr: string;
  Description_ja: string;
  GameContentLinks: [];
  GamePatch: GamePatchData;
  ID: number;
  Icon: string;
  IconHD: string;
  ItemID: number;
  Item: ItemData | null;
  ItemTarget: string;
  ItemTargetID: number;
  Key: number;
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
  Order: number;
  Patch: number | null;
  Points: number;
  PostAchievements: [];
  PreAchievements: [];
  QuestRequirements: {}[];
  QuestRequirementsAll: boolean;
  Title: TitleData | null;
  TitleTarget: string;
  TitleTargetID: number;
  Type: number;
  Url: string;
}
