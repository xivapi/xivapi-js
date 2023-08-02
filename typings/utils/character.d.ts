import { SearchParams, SearchResult } from "./search";
import { AchievementsData } from "./achievements";
import { FreeCompanyGetResult } from "./freecompany";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface CharacterSearchParams extends Omit<SearchParams, "name"> {}
export interface CharacterGetParams {
  /**
   * If set to 1, the API will return more data in the response by extending out the data IDs to useful objects.
   */
  extended?: 1;

  /**
   * By default the `Character`, `ClassJobs`, `Minion` and `Mount` data will return, you can request more data using the `data` query.
   * @see https://xivapi.com/docs/Character#character
   */
  data?: ("AC" | "FR" | "FC" | "FC" | "FCM" | "MIMO" | "PVP")[];
}

export interface BasicCharacterData {
  Avatar: string;
  FeastMatches: number;
  ID: number;
  Lang: string | null;
  Name: string;
  Rank: number | null;
  RankIcon: string | null;
  Server: string;
}

export interface CharacterSearchResult extends SearchResult {
  Results: BasicCharacterData[];
}

export interface ClassJobData {
  ClassID: number;
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  IsSpecialised: boolean;
  JobID: number;
  Level: number;
  Name: string;
  UnlockedState: {
    ID: number;
    Name: string;
  };
}

export interface GearData {
  Creator: string | null;
  Dye: number | null;
  ID: number | null;
  Materia: number[];
  Mirage: number | null;
}

export interface GearsetData {
  Attributes: { [key: string]: number };
  ClassID: number;
  Gear: {
    Body: GearData | undefined;
    Bracelets: GearData | undefined;
    Earrings: GearData | undefined;
    Feet: GearData | undefined;
    Hands: GearData | undefined;
    Head: GearData | undefined;
    Legs: GearData | undefined;
    MainHand: GearData | undefined;
    Necklace: GearData | undefined;
    OffHand: GearData | undefined;
    Ring1: GearData | undefined;
    Ring2: GearData | undefined;
    SoulCrystal: GearData | undefined;
  };
  GearKey: string;
  JobID: number;
  Level: number;
}

export interface CharacterData {
  ActiveClassJob: ClassJobData;
  Avatar: string;
  Bio: string;
  ClassJobs: ClassJobData[];
  ClassJobsBozjan: { Level: number | null; Mettle: number | null; Name: string };
  ClassJobsElemental: {
    ExpLevel: number;
    ExpLevelMax: number;
    ExpLevelTogo: number;
    Level: number;
    Name: string;
  }[];
  DC: string;
  FreeCompanyId: string | null;
  FreeCompanyName: string | null;
  GearSet: GearsetData;
  Gender: 1 | 2;
  GrandCompany: {
    NameID: number;
    RankID: number;
  };
  GuardianDeity: number;
  ID: number;
  Lang: string | null;
  Name: string;
  Nameday: string;
  ParseDate: number;
  Portrait: string;
  PvPTeamId: number | null;
  Race: number;
  Server: string;
  Title: number;
  TitleTop: boolean;
  Town: number;
  Tribe: number;
}

export interface CharacterGetResult {
  Achievements: AchievementsData | null;
  AchievementsPublic: boolean | null;
  Character: CharacterData;
  FreeCompany: FreeCompanyGetResult | null;
  FreeCompanyMembers: BasicCharacterData[] | null;
  Friends: BasicCharacterData[] | null;
  FriendsPublic: boolean | null;
  Minions: { Icon: string; Name: string }[] | null;
  Mounts: { Icon: string; Name: string }[] | null;
  PvPTeam: null;
}
