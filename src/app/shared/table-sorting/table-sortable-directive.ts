import { Input, Output, EventEmitter, Directive } from "@angular/core";
import { TableSortingSortEvent } from "./table-sorting-sort-event";

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Directive({
    selector: "th[sortable]",
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class TableSortableDirective {

    @Input() sortable: string;

    @Input() direction: SortDirection = '';

    @Output() sort = new EventEmitter<TableSortingSortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}
