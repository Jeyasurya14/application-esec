import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';

export interface TimeRange{
  start: string;
  end: string;
}

@Component({
  selector: 'app-time-range-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-range-picker.html',
  styleUrl: './time-range-picker.scss',
})
export class TimeRangePicker {

  start = input('10:00');
  end = input('17:00');

  timeChange = output<TimeRange>();

  isOpen = signal(false);


  startHour = signal('10');
  startMinute = signal('00');

  endHour = signal('17');
  endMinute = signal('00');

  displayTime = computed(() =>{
    return `${this.startHour()}:${this.startMinute()} - ${this.endHour()}:${this.endMinute()}` 
  })


  constructor(){
    effect(()=>{
    const start = this.start().split(':')
    this.startHour.set(start[0]);
    this.startMinute.set(start[1]);
    const end = this.end().split(':')
    this.endHour.set(end[0]);
    this.endMinute.set(end[1]);
    })
  }

    toggle(){
    this.isOpen.update(value => !value)
  }
  close(){
    this.isOpen.set(false)
  }
  

  changeStartHour(hour:string){
    this.startHour.set(hour);
    this.emit();
  }
  changeStartMinute(minute:string){
    this.startMinute.set(minute);
    this.emit();
  }
  changeEndHour(hour:string){
    this.endHour.set(hour);
    this.emit();
  }
  changeEndMinute(minute:string){
    this.endMinute.set(minute);
    this.emit()
  }

  public emit(){
    this.timeChange.emit({
      start:`${this.startHour()}:${this.startMinute()}`,
      end: `${this.endHour()}:${this.endMinute()}`
    })
  }
  private resetTime(): void {

  this.startHour.set('10');
  this.startMinute.set('00');

  this.endHour.set('17');
  this.endMinute.set('00');

  this.emit();

}
validateTime(): void {

  const values = [
    Number(this.startHour()),
    Number(this.startMinute()),
    Number(this.endHour()),
    Number(this.endMinute())
  ];

  const isValid =
    values[0] >= 0 && values[0] <= 23 &&
    values[1] >= 0 && values[1] <= 59 &&
    values[2] >= 0 && values[2] <= 23 &&
    values[3] >= 0 && values[3] <= 59;

  if (!isValid) {
    this.resetTime();
    return;
  }

  this.startHour.set(this.startHour().padStart(2, '0'));
  this.startMinute.set(this.startMinute().padStart(2, '0'));
  this.endHour.set(this.endHour().padStart(2, '0'));
  this.endMinute.set(this.endMinute().padStart(2, '0'));

  this.emit();

}
  readonly hours = Array.from(
    {length:24},
    (_, i) => i.toString().padStart(2,'0')
  )

  readonly minutes = Array.from(
    {length:60},
    (_, i) => i.toString().padStart(2,'0')
  )

}
