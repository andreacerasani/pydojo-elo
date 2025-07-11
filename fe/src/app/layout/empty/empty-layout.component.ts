import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/theme-service';
import { ThemeStyle } from '../../types/enums';

@Component({
  selector: 'empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [ CommonModule],
  standalone: true,
})
export class EmptyLayoutComponent implements OnInit {
  themeStyle: ThemeStyle | null = null;
  subscription: Subscription | null = null;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeStyle = this.themeService.themeStyle;
    this.subscription = this.themeService.themeUpdateSubject.subscribe({
      next: (theme) => {
        this.themeStyle = theme;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

}
