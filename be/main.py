from fastapi import FastAPI

from be.in_memory_repository import InMemoryRepository
from be.match import Match
from be.player import Player

app = FastAPI()
in_memory_repo = InMemoryRepository()


@app.post("/register-player")
def register_player(player: Player):
    player = in_memory_repo.register_player(player)

    return player

@app.post("/register-match")
def register_match(match: Match):
    match = in_memory_repo.register_match(match)

    return match

@app.get("/leaderboard")
def get_leaderboard() -> list[Player]:
    return in_memory_repo.get_leaderboard()
    

@app.get("/match-history")
def get_match_history() -> list[Match]:
    return in_memory_repo.get_matches()
    

@app.get("/players")
def get_players() -> list[Player]:
    return in_memory_repo.get_players()