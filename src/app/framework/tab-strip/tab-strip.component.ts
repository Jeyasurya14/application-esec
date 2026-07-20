import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, inject, input, output, signal, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { TabStripItem } from "./tab-strip.model";
import { SidebarService } from "../../core/services/sidebar.service";


@Component({
    selector:'app-tab-strip',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./tab-strip.component.html',
    styleUrl:'./tab-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TabStrip implements AfterViewInit{
    tabs = input.required<readonly TabStripItem[]>();

    private dragIndex = -1
    dragStart = output<number>();
    dragEnter = output<number>();
    drop = output<number>();
    dragEnd = output<void>();

    onDragStart(index:number):void{
        this.dragIndex = index;
        this.dragStart.emit(index)
    }
    onDragEnter(index:number):void{
        this.dragEnter.emit(index)
    }
    onDrop(index:number):void{
        this.drop.emit(index)
    }
    onDragEnd():void{
        this.dragIndex = -1
        this.dragEnd.emit()
    }

    activate = output<string>();
    close = output<string>();
    contextMenu = output<{
        event: MouseEvent;
        id:string;
    }>();
    @ViewChild('container')
    private container!:ElementRef<HTMLDivElement>
    readonly canScrollLeft = signal(false)
    readonly canScrollRight  = signal(false)

    readonly hasTabs = this.tabs.length > 0
    ngAfterViewInit(): void {
        const element = this.container.nativeElement

        element.addEventListener(
            'scroll',
            () => this.updateButtons()
        )
        // element.addEventListener(
        //     'wheel',
        //     event =>{
        //         event.preventDefault();
        //         element.scrollLeft += event.deltaY
        //     },
        //     {passive:false}
        // );
       this.updateButtons();
    }
    scrollLeft():void{
        this.container.nativeElement.scrollBy({
            behavior:'smooth',
            left:-250
        })
    }
    scrollRight():void{
        this.container.nativeElement.scrollBy({
            behavior:'smooth',
            left:250
        })
    }

    private updateButtons():void{
        const element = this.container.nativeElement

        this.canScrollLeft.set(
            element.scrollLeft > 0
        )
        this.canScrollRight.set(
            element.scrollLeft < element.scrollWidth - element.clientWidth
        )
    }

}