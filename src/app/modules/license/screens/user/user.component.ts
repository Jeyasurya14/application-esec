import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { userContext } from './user.context';

@Component({
  selector: 'license-user',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  context = userContext;
}
