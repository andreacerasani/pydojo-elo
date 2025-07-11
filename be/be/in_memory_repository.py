from be.elo_calculator import EloCalculator
from be.match import Match
from be.player import Player


class InMemoryRepository:

    def __init__(self) -> None:
        self.players: list[Player] = []
        self.max_player_id = 0
        self.matches: list[Match] = []
        self.max_match_id = 0
        self.elo_calc = EloCalculator(k = 30)
    
    def register_player(self, player: Player) -> Player:
        player.player_id = str(self.max_player_id)
        self.max_player_id += 1
        self.players.append(player)

        return player

    def register_match(self, match: Match) -> Match:
        match = self.elo_calc.update_elos(match)

        for player in match.get_players():
            for id, registered_player in enumerate(self.players):
                if player.player_id == registered_player:
                    self.players[id] = player

        match.match_id = str(self.max_match_id)

        self.max_match_id += 1
        self.matches.append(match)

        return match

    def get_leaderboard(self) -> list[Player]:
        sorted_players = sorted(self.players, key= lambda player: player.elo, reverse=True)

        return sorted_players

    def get_players(self) -> list[Player]:
        return self.players
    
    def get_matches(self) -> list[Match]:
        return self.matches
    
