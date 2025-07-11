from pydantic import BaseModel

class Player(BaseModel):
    player_id: str | None
    name: str
    surname: str
    elo: float

