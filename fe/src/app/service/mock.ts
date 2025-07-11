import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdvertiserData, Match, Player, ProjectData } from "../types/model";

const MOCK_TIME = 500;

export const buildMocked = <T>(response: T): Observable<T> => {
  return new Observable<T>((subscriber) => {
    setTimeout(() => {
      subscriber.next(response);
      subscriber.complete();
    }, MOCK_TIME);
  });
};
export const buildMockedError = <T>(response?: T): Observable<T> => {
  return new Observable<T>((subscriber) => {
    setTimeout(() => {
      subscriber.error(response);
      subscriber.complete();
    }, MOCK_TIME);
  });
};
export const buildMockedProgress = () =>
  new Observable((subscriber) => {
    let progress = 0;
    const intervalId = setInterval(() => {
      if (progress > 100) {
        clearInterval(intervalId);
        subscriber.next(new HttpResponse());
        subscriber.complete();
      } else {
        subscriber.next({
          type: HttpEventType.UploadProgress,
          loaded: progress,
          total: 100,
        });
        progress += 25;
      }
    }, MOCK_TIME);
  });

export const MOCK_LOGIN_RESPONSE: string = "jwt_token";

export const MOCK_ADVERTISERS_USERS: AdvertiserData[] = [
  ...Array(5).keys(),
].map((cn) => ({
  id: `a_id_${cn}`,
  name: `Advertiser ${cn}`,
  projects: [...Array(5).keys()].map((n) => ({
    id: `id_${n + cn * 5}`,
    name: `Project ${n}`,
    advertiserId: `a_id_${cn}`,
  })),
}));

export const MOCK_PROJECT_DATA: ProjectData = {
  id: "id_0",
  name: "Mocked project",
  advertiserId: "a_id_1",
};

export const MOCK_PLAYERS: Player[] = [
  {
    name: "Pardeep",
    playerId: "1",
    surname: "Kumar",
  },
  {
    name: "Damiano",
    playerId: "2",
    surname: "D'Aleo",
  },
  {
    name: "Andrea",
    playerId: "3",
    surname: "Cesarini",
  },
  {
    name: "Ale",
    playerId: "4",
    surname: "Lavelli",
  },
  {
    name: "Nicole",
    playerId: "5",
    surname: "Gentile",
  },
  {
    name: "Bozidar",
    playerId: "6",
    surname: "Ristic",
  },
];

export const MOCK_MATCH: Match[] = [
  {
    score: [10, 8],
    team1: [
      {
        name: "Pardeep",
        playerId: "1",
        surname: "Kumar",
      },
      {
        name: "Damiano",
        playerId: "2",
        surname: "D'Aleo",
      },
    ],
    team2: [
      {
        name: "Nicole",
        playerId: "5",
        surname: "Gentile",
      },
      {
        name: "Bozidar",
        playerId: "6",
        surname: "Ristic",
      },
    ],
    timestamp: "2025-07-11",
  },
];
