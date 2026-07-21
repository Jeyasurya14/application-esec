import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { groupMemberContext } from './group-member.context';

@Component({
  selector: 'license-group-member',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './group-member.component.html',
  styleUrl: './group-member.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupMemberComponent {
  context = groupMemberContext;
}
