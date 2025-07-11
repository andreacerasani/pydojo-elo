import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Event, ResolveEnd, Router, RouterOutlet } from "@angular/router";
import { EmptyLayoutComponent } from "../../layout/empty/empty-layout.component";
import { ThemeService } from "../../service/theme-service";
import { LayoutType } from "../../types/enums";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmptyLayoutComponent],
})
export class AppComponent implements OnInit {
  LayoutType = LayoutType;
  layoutType: LayoutType = LayoutType.Splash;

  constructor(private router: Router, private themeService: ThemeService) {
    this.themeService.initialize();
  }

  ngOnInit(): void {
    this.initializePageChangeListener();
  }
  initializePageChangeListener() {
    this.router.events.subscribe({
      next: (event: Event) => {
        if (event instanceof ResolveEnd) {
          this.layoutType = event.state.root.firstChild?.data["layoutType"];
        }
      },
    });
  }
}
