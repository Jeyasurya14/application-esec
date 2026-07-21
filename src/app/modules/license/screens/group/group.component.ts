import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { groupContext } from './group.context';

@Component({
  selector: 'license-group',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent {
  context = groupContext;
}
