
import {
  Component,
  computed,
  effect,
  input,
  output,
  signal, ChangeDetectionStrategy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  DateRange,
  PeriodPreset
} from '../../core/models/period.model';

import { resolveRange } from '../../core/services/period-range.util';
import { TimeRangePicker, TimeRange } from "../../shared/time-range-picker/time-range-picker";

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TimeRangePicker,
],
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  onTimeChanged(range: TimeRange) {
    this.startTime.set(range.start);
    this.endTime.set(range.end);
  }

  presets = input<PeriodPreset[]>([]);
  defaultPreset = input<PeriodPreset | null>(null);
  rangeChanged = output<DateRange>();

  /**
   * Notify parent when preset changes
   */
  presetChanged = output<PeriodPreset>();

  /**
   * Current selected preset
   */
  selectedPreset = signal<PeriodPreset | null>(null);

  /**
   * Current resolved range
   */
  selectedRange = signal<DateRange | null>(null);

  /**
   * Time
   */
startTime = signal('10:00');

endTime = signal('17:00');


periodLabel = computed(() => {

    const preset = this.selectedPreset();

    return preset?.label ?? '';

  });

  constructor() {

    /**
     * Initialize
     */
 effect(() => {

  const preset = this.defaultPreset();

  if (!preset) {
    return;
  }

  this.selectedPreset.set(preset);

  const range = resolveRange(preset);

  this.selectedRange.set(range);

  this.rangeChanged.emit(range);

});

  }

  /**
   * User changed period
   */
  selectPreset(id: string) {

    const preset = this.presets()
      .find(x => x.id === id);

    if (!preset) {
      return;
    }

    this.selectedPreset.set(preset);

    const range = resolveRange(preset);

    this.selectedRange.set(range);

    this.presetChanged.emit(preset);

    this.rangeChanged.emit(range);

  }

  /**
   * Refresh
   */
  refresh() {

    const preset = this.selectedPreset();

    if (!preset) {

      return;
    }

    const range = resolveRange(preset);

    this.selectedRange.set(range);

    this.rangeChanged.emit(range);

  }

}