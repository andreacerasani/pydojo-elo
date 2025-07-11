import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { ApiService } from "../../../service/api.service";
import { Match, Player } from "../../../types/model";

@Component({
  selector: "home-page",
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class HomePageComponent implements OnInit {
  loading: boolean = false;
  loadingMatches: boolean = false;

  players: Player[] | null = null;
  matches: Match[] | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  fg: FormGroup = this.fb.group({
    player1: [""],
    player2: [""],
    team1Score: [0],
    team2Score: [0],
  });

  ngOnInit(): void {
    this.loadPlayers();
    this.getMatches();
  }

  loadPlayers() {
    this.loading = true;
    this.apiService.getPlayers().subscribe({
      next: (response) => {
        this.players = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  addScore() {
    this.loading = true;
    this.apiService.getPlayers().subscribe({
      next: (response) => {
        this.players = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getMatches() {
    this.loading = true;
    this.apiService.getMatches().subscribe({
      next: (response) => {
        this.matches = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
