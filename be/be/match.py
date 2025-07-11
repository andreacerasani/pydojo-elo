from pydantic import BaseModel
from datetime import datetime

from be.player import Player

class Match(BaseModel):
    match_id: str
    team_1: list[Player]
    team_2: list[Player]
    score: tuple[int, int]
    timestamp: datetime

    def get_players(self) -> list[Player]:
        return self.team_1 + self.team_2