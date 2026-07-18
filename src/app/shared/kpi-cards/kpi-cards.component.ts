import { Component, computed, input } from '@angular/core';
import { KpiCardsConfig } from './kpi-cards.model';

const COLOR_MAP: Record<string, { bg: string; text: string; icon: string }> = {
  primary: { bg: '#eff6ff', text: '#1e40af', icon: '#3b82f6' },
  success: { bg: '#ecfdf5', text: '#065f46', icon: '#10b981' },
  warning: { bg: '#fffbeb', text: '#92400e', icon: '#f59e0b' },
  danger: { bg: '#fef2f2', text: '#991b1b', icon: '#ef4444' },
  info: { bg: '#f0f9ff', text: '#0c4a6e', icon: '#06b6d4' },
};

@Component({
  selector: 'kpi-cards',
  standalone: true,
  template: `
    <div class="kpi-grid" [style.grid-template-columns]="gridCols()">
      @for (metric of config().metrics; track metric.id) {
        <div
          class="kpi-card"
          [style.--kpi-bg]="getColors(metric).bg"
          [style.--kpi-text]="getColors(metric).text"
        >
          <div class="kpi-card__header">
            <span class="kpi-card__label">{{ metric.label }}</span>
            @if (metric.icon) {
              <i
                class="kpi-card__icon"
                [class]="metric.icon"
                [style.color]="getColors(metric).icon"
              ></i>
            }
          </div>
          <div class="kpi-card__value">
            <span class="kpi-card__number">{{ formatValue(metric) }}</span>
            @if (metric.suffix) {
              <span class="kpi-card__suffix">{{ metric.suffix }}</span>
            }
          </div>
          @if (metric.trend) {
            <div
              class="kpi-card__trend"
              [class.kpi-card__trend--up]="metric.trend === 'up'"
              [class.kpi-card__trend--down]="metric.trend === 'down'"
            >
              <i
                class="bi"
                [class.bi-arrow-up-short]="metric.trend === 'up'"
                [class.bi-arrow-down-short]="metric.trend === 'down'"
                [class.bi-dash]="metric.trend === 'neutral'"
              ></i>
              @if (metric.trendValue) {
                <span>{{ metric.trendValue }}</span>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .kpi-grid {
        display: grid;
        gap: 8px;
        padding: 8px 12px;
        background: #fff;
        border-bottom: 1px solid #e8ebef;
      }
      .kpi-card {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px 12px;
        background: var(--kpi-bg);
        border-radius: 8px;
        min-width: 0;
      }
      .kpi-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .kpi-card__label {
        font-size: 11px;
        font-weight: 500;
        color: var(--kpi-text);
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      .kpi-card__icon {
        font-size: 14px;
      }
      .kpi-card__value {
        display: flex;
        align-items: baseline;
        gap: 2px;
      }
      .kpi-card__number {
        font-size: 20px;
        font-weight: 700;
        color: var(--kpi-text);
        line-height: 1.2;
      }
      .kpi-card__suffix {
        font-size: 12px;
        font-weight: 500;
        color: var(--kpi-text);
        opacity: 0.7;
      }
      .kpi-card__trend {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
      }
      .kpi-card__trend--up {
        color: #10b981;
      }
      .kpi-card__trend--down {
        color: #ef4444;
      }
    `,
  ],
})
export class KpiCardsComponent {
  readonly config = input.required<KpiCardsConfig>();

  readonly gridCols = computed(() => {
    const cols = this.config().columns ?? 4;
    return `repeat(${cols}, 1fr)`;
  });

  getColors(metric: { color?: string }): { bg: string; text: string; icon: string } {
    return COLOR_MAP[metric.color ?? 'primary'] ?? COLOR_MAP['primary'];
  }

  formatValue(metric: {
    value: number | string;
    prefix?: string;
    formatter?: (v: number | string) => string;
  }): string {
    const val = metric.formatter ? metric.formatter(metric.value) : String(metric.value);
    return metric.prefix ? `${metric.prefix}${val}` : val;
  }
}
