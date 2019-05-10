export type SortDirection = 'asc' | 'desc' | '';

export interface TableSortingSortEvent {
    column: string;
    direction: SortDirection;
}
