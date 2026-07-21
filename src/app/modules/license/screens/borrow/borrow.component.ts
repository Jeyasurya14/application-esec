import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { borrowContext } from './borrow.context';

@Component({
  selector: 'license-borrow',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorrowComponent {
  context = borrowContext;
}
