export interface LoginResponse {
  token: string;
}

export interface AdvertiserData {
  id: string;
  name: string;
  projects: ProjectData[];
}

export interface ProjectData {
  id: string;
  name: string;
  advertiserId: string;
}

export interface Player {
  playerId: string;
  name: string;
  surname: string;
}

export interface Match {
  team1: Player[];
  team2: Player[];
  score: number[];
  timestamp: string;
}

export interface CreatePlayerRequest {
  name: string;
  surname: string;
}
