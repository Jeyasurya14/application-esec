import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { myFeatureContext } from './my-feature.context';

@Component({
  selector: 'license-my-feature',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './my-feature.component.html',
  styleUrl: './my-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFeatureComponent {
  context = myFeatureContext;
}
