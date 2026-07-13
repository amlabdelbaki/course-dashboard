import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() collapsed = false;

  constructor(
    private dialog: MatDialog,
  ) {}

  menuItems = [
    { label: 'courses', icon: 'dashboard', route: '/', exact: true },
    { label: 'programs', icon: 'task', route: '/tasks' },
    { label: 'subscriptions', icon: 'bookmark_border', route: '/calendar' },
    { label: 'gradebook', icon: 'assignment', route: '/analytics' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];


}
