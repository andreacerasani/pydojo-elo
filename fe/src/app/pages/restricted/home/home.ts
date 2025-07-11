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
import { Player } from "../../../types/model";

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
  players: Player[] | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  fg: FormGroup = this.fb.group({
    player1: [""],
    player2: [""],
    team1Score: [0],
    team2Score: [0],
  });

  ngOnInit(): void {
    this.loadPlayers();
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
}
