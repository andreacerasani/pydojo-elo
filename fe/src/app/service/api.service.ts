import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {
  AdvertiserData,
  CreatePlayerRequest,
  Match,
  Player,
  ProjectData,
} from "../types/model";
import {
  MOCK_ADVERTISERS_USERS,
  MOCK_MATCH,
  MOCK_PLAYERS,
  MOCK_PROJECT_DATA,
  buildMocked,
} from "./mock";

const MOCKED = true;
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getAdvertisersUsers(): Observable<AdvertiserData[]> {
    return MOCKED
      ? buildMocked(MOCK_ADVERTISERS_USERS)
      : this.httpClient.get<AdvertiserData[]>(
          environment.apiHost + "/accounts"
        );
  }

  getUserData(userId: string): Observable<ProjectData> {
    return MOCKED
      ? buildMocked(MOCK_PROJECT_DATA)
      : this.httpClient.get<ProjectData>(
          `${environment.apiHost}/user/${userId}`
        );
  }

  getPlayers(): Observable<Player[]> {
    return MOCKED
      ? buildMocked(MOCK_PLAYERS)
      : this.httpClient.get<Player[]>(`${environment.apiHost}/players/`);
  }

  getMatches(): Observable<Match[]> {
    return MOCKED
      ? buildMocked(MOCK_MATCH)
      : this.httpClient.get<Match[]>(`${environment.apiHost}/match-history/`);
  }

  registerPlayer(request: CreatePlayerRequest): Observable<string> {
    return MOCKED
      ? buildMocked("OK")
      : this.httpClient.post<string>(
          environment.apiHost + "/register-player",
          request
        );
  }
}
