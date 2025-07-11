import math
from be.match import Match
from be.player import Player

class EloCalculator:
    def __init__(self, k: int):
        self.k = k

    def update_elos(self, match: Match) -> Match:
        """
        Return match with scores of players updated
        """
        score_a, score_b = match.score

        if score_a > score_b:
            outcome = 1.0
        elif score_a < score_b:
            outcome = 0.0
        else:
            outcome = 0.5

        if len(match.team_1) != 2 or len(match.team_2) != 2:
            raise ValueError("Teams must have two members")
        
        player_1a, player_1b = match.team_1[0], match.team_1[1]
        player_2a, player_2b = match.team_2[0], match.team_2[1]

        combinations = [
            (player_1a, player_2a),
            (player_1b, player_2a),
            (player_1a, player_2b),
            (player_1b, player_2b)
        ]

        for player_a, player_b in combinations:
            self._update_two_players(player_a=player_a, player_b=player_b, outcome=outcome)

        match.team_1 = [player_1a, player_1b]
        match.team_2 = [player_2a, player_2b]

        return match

    def _update_two_players(self, player_a: Player, player_b: Player, outcome: float) -> tuple[Player, Player]:
        # 1 if a won, 0 if b won, 0.5 for draw
        elo_a = player_a.elo
        elo_b = player_b.elo

        p_b = self._probability(elo_a, elo_b)
        p_a = self._probability(elo_b, elo_a)

        elo_a += self.k * (outcome - p_a)
        elo_b += self.k * ((1 - outcome) - p_b)

        player_a.elo = elo_a
        player_b.elo = elo_b

        return player_a, player_b
        

    # Function to calculate the Probability
    @staticmethod
    def _probability(rating1, rating2):
        # Calculate and return the expected score
        return 1.0 / (1 + math.pow(10, (rating1 - rating2) / 400.0))
    
    
        
