import { CoreOptions, CoreInstance, CoreRowModelOptions } from './core/table'
import {
  ColumnVisibilityInstance,
  ColumnVisibilityTableState,
  ColumnVisibilityColumn as ColumnVisibilityColumn,
  VisibilityOptions,
  ColumnVisibilityColumnDef,
  VisibilityRow,
} from './features/ColumnVisibility'
import {
  ColumnOrderColumn,
  ColumnOrderInstance,
  ColumnOrderOptions,
  ColumnOrderTableState,
} from './features/ColumnOrdering'
import {
  ColumnPinningColumn,
  ColumnPinningColumnDef,
  ColumnPinningInstance,
  ColumnPinningOptions,
  ColumnPinningRow,
  ColumnPinningTableState,
} from './features/ColumnPinning'
import {
  RowPinningInstance,
  RowPinningOptions,
  RowPinningRow,
  RowPinningTableState,
} from './features/RowPinning'
import {
  CoreHeader,
  CoreHeaderGroup,
  HeaderContext,
  HeadersInstance,
} from './core/headers'
import {
  ColumnFacetingColumn,
  ColumnFacetingOptions,
} from './features/ColumnFaceting'
import { GlobalFacetingInstance } from './features/GlobalFaceting'
import {
  ColumnFilteringColumn,
  ColumnFilteringColumnDef,
  ColumnFilteringInstance,
  ColumnFilteringOptions,
  ColumnFiltersRow,
  ColumnFilteringTableState,
} from './features/ColumnFiltering'
import {
  GlobalFilterColumn,
  GlobalFilterColumnDef,
  GlobalFilterInstance,
  GlobalFilterOptions,
  GlobalFilterTableState,
} from './features/GlobalFiltering'
import {
  SortingColumn,
  SortingColumnDef,
  SortingInstance,
  SortingOptions,
  SortingTableState,
} from './features/RowSorting'
import {
  ColumnGroupingCell,
  ColumnGroupingColumn,
  ColumnGroupingColumnDef,
  ColumnGroupingInstance,
  ColumnGroupingOptions,
  ColumnGroupingRow,
  ColumnGroupingTableState,
} from './features/ColumnGrouping'
import {
  ExpandedInstance,
  ExpandedOptions,
  ExpandedTableState,
  ExpandedRow,
} from './features/RowExpanding'
import {
  ColumnSizingColumn,
  ColumnSizingColumnDef,
  ColumnSizingHeader,
  ColumnSizingInstance,
  ColumnSizingOptions,
  ColumnSizingTableState,
} from './features/ColumnSizing'
import {
  PaginationInstance,
  PaginationOptions,
  PaginationTableState,
} from './features/RowPagination'
import {
  RowSelectionInstance,
  RowSelectionOptions,
  RowSelectionRow,
  RowSelectionTableState,
} from './features/RowSelection'
import { CoreRow } from './core/row'
import { PartialKeys, UnionToIntersection } from './utils'
import { CellContext, CoreCell } from './core/cell'
import { CoreColumn } from './core/column'

// export type Prettify<T> = { [K in keyof T]: T[K] } & unknown

export interface TableFeature {
  createCell?: <
    TData extends RowData,
    TValue,
    TFeatures extends TableFeatures = {},
  >(
    cell: Cell<TData, TValue, TFeatures>,
    column: Column<TData, TValue, TFeatures>,
    row: Row<TData, TFeatures>,
    table: Table<TData, TFeatures>
  ) => void
  createColumn?: <
    TData extends RowData,
    TValue,
    TFeatures extends TableFeatures = {},
  >(
    column: Column<TData, TValue, TFeatures>,
    table: Table<TData, TFeatures>
  ) => void
  createHeader?: <
    TData extends RowData,
    TValue,
    TFeatures extends TableFeatures = {},
  >(
    header: Header<TData, TValue, TFeatures>,
    table: Table<TData, TFeatures>
  ) => void
  createRow?: <TData extends RowData, TFeatures extends TableFeatures = {}>(
    row: Row<TData, TFeatures>,
    table: Table<TData, TFeatures>
  ) => void
  createTable?: <TData extends RowData, TFeatures extends TableFeatures = {}>(
    table: Table<TData, TFeatures>
  ) => void
  getDefaultColumnDef?: <
    TData extends RowData,
    TFeatures extends TableFeatures = {},
  >() => Partial<ColumnDef<TData, unknown, TFeatures>>
  getDefaultOptions?: <
    TData extends RowData,
    TFeatures extends TableFeatures = {},
  >(
    table: Table<TData, TFeatures>
  ) => Partial<TableOptionsResolved<TData, TFeatures>>
  getInitialState?: <TFeatures extends TableFeatures = {}>(
    initialState?: Partial<TableState<TFeatures>>
  ) => Partial<TableState<TFeatures>>
}

export type TableFeatures = {
  ColumnFaceting?: TableFeature
  ColumnFiltering?: TableFeature
  ColumnGrouping?: TableFeature
  ColumnOrdering?: TableFeature
  ColumnPinning?: TableFeature
  ColumnSizing?: TableFeature
  ColumnVisibility?: TableFeature
  GlobalFaceting?: TableFeature
  GlobalFiltering?: TableFeature
  Headers?: TableFeature
  RowExpanding?: TableFeature
  RowPagination?: TableFeature
  RowPinning?: TableFeature
  RowSelection?: TableFeature
  RowSorting?: TableFeature
}

export interface TableMeta<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {}

export interface ColumnMeta<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> {}

export interface FilterMeta {}

export interface FilterFns {}

export interface SortingFns {}

export interface AggregationFns {}

export type Updater<T> = T | ((old: T) => T)
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void

export type RowData = Record<string, unknown>

export type AnyRender = (Comp: any, props: any) => any

export type Table<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreInstance<TData, TFeatures>
  | HeadersInstance<TData, TFeatures>
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringInstance<TData, TFeatures>
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingInstance<TData, TFeatures>
      : never)
  | ('ColumnOrdering' extends keyof TFeatures
      ? ColumnOrderInstance<TData, TFeatures>
      : never)
  | ('ColumnPinning' extends keyof TFeatures
      ? ColumnPinningInstance<TData, TFeatures>
      : never)
  | ('ColumnSizing' extends keyof TFeatures
      ? ColumnSizingInstance<TData, TFeatures>
      : never)
  | ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityInstance<TData, TFeatures>
      : never)
  | ('GlobalFiltering' extends keyof TFeatures
      ? GlobalFilterInstance<TData, TFeatures>
      : never)
  | ('RowExpanding' extends keyof TFeatures
      ? ExpandedInstance<TData, TFeatures>
      : never)
  | ('RowPagination' extends keyof TFeatures
      ? PaginationInstance<TData, TFeatures>
      : never)
  | ('RowPinning' extends keyof TFeatures
      ? RowPinningInstance<TData, TFeatures>
      : never)
  | ('RowSelection' extends keyof TFeatures
      ? RowSelectionInstance<TData, TFeatures>
      : never)
  | ('RowSorting' extends keyof TFeatures
      ? SortingInstance<TData, TFeatures>
      : never)
>

export type TableOptionsResolved<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreOptions<TData, TFeatures>
  | CoreRowModelOptions<TData, TFeatures>
  | ('ColumnFaceting' extends keyof TFeatures
      ? ColumnFacetingOptions<TData, TFeatures>
      : never)
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringOptions<TData, TFeatures>
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingOptions<TData, TFeatures>
      : never)
  | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderOptions : never)
  | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningOptions : never)
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingOptions : never)
  | ('ColumnVisibility' extends keyof TFeatures ? VisibilityOptions : never)
  | ('GlobalFiltering' extends keyof TFeatures
      ? GlobalFilterOptions<TData, TFeatures>
      : never)
  | ('RowExpanding' extends keyof TFeatures
      ? ExpandedOptions<TData, TFeatures>
      : never)
  | ('RowPagination' extends keyof TFeatures ? PaginationOptions : never)
  | ('RowPinning' extends keyof TFeatures
      ? RowPinningOptions<TData, TFeatures>
      : never)
  | ('RowSelection' extends keyof TFeatures
      ? RowSelectionOptions<TData, TFeatures>
      : never)
  | ('RowSorting' extends keyof TFeatures
      ? SortingOptions<TData, TFeatures>
      : never)
>

export type TableOptions<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = PartialKeys<
  TableOptionsResolved<TData, TFeatures>,
  'state' | 'onStateChange' | 'renderFallbackValue'
>

export type TableState<TFeatures extends TableFeatures = {}> =
  UnionToIntersection<
    | ('ColumnFiltering' extends keyof TFeatures
        ? ColumnFilteringTableState
        : never)
    | ('ColumnGrouping' extends keyof TFeatures
        ? ColumnGroupingTableState
        : never)
    | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderTableState : never)
    | ('ColumnPinning' extends keyof TFeatures
        ? ColumnPinningTableState
        : never)
    | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingTableState : never)
    | ('ColumnVisibility' extends keyof TFeatures
        ? ColumnVisibilityTableState
        : never)
    | ('GlobalFiltering' extends keyof TFeatures
        ? GlobalFilterTableState
        : never)
    | ('RowExpanding' extends keyof TFeatures ? ExpandedTableState : never)
    | ('RowPagination' extends keyof TFeatures ? PaginationTableState : never)
    | ('RowPinning' extends keyof TFeatures ? RowPinningTableState : never)
    | ('RowSelection' extends keyof TFeatures ? RowSelectionTableState : never)
    | ('RowSorting' extends keyof TFeatures ? SortingTableState : never)
  >

export type Row<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreRow<TData, TFeatures>
  | ('ColumnFiltering' extends keyof TFeatures ? ColumnFiltersRow : never)
  | ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingRow : never)
  | ('ColumnPinning' extends keyof TFeatures
      ? ColumnPinningRow<TData, TFeatures>
      : never)
  | ('ColumnVisibility' extends keyof TFeatures
      ? VisibilityRow<TData, TFeatures>
      : never)
  | ('RowExpanding' extends keyof TFeatures ? ExpandedRow : never)
  | ('RowPinning' extends keyof TFeatures ? RowPinningRow : never)
  | ('RowSelection' extends keyof TFeatures ? RowSelectionRow : never)
>

export interface RowModel<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {
  rows: Row<TData, TFeatures>[]
  flatRows: Row<TData, TFeatures>[]
  rowsById: Record<string, Row<TData, TFeatures>>
}

export type AccessorFn<TData extends RowData, TValue = unknown> = (
  originalRow: TData,
  index: number
) => TValue

export type ColumnDefTemplate<TProps extends object> =
  | string
  | ((props: TProps) => any)

export type StringOrTemplateHeader<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = string | ColumnDefTemplate<HeaderContext<TData, TValue, TFeatures>>

export interface StringHeaderIdentifier {
  header: string
  id?: string
}

export interface IdIdentifier<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> {
  id: string
  header?: StringOrTemplateHeader<TData, TValue, TFeatures>
}

type ColumnIdentifiers<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = IdIdentifier<TData, TValue, TFeatures> | StringHeaderIdentifier

//

type ColumnDefExtensions<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityColumnDef
      : never)
  | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumnDef : never)
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringColumnDef<TData, TFeatures>
      : never)
  | ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumnDef : never)
  | ('RowSorting' extends keyof TFeatures
      ? SortingColumnDef<TData, TFeatures>
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingColumnDef<TData, TValue, TFeatures>
      : never)
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumnDef : never)
>

export type ColumnDefBase<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = ColumnDefExtensions<TData, TValue, TFeatures> & {
  getUniqueValues?: AccessorFn<TData, unknown[]>
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue, TFeatures>>
  cell?: ColumnDefTemplate<CellContext<TData, TValue, TFeatures>>
  meta?: ColumnMeta<TData, TValue, TFeatures>
}

//

export type IdentifiedColumnDef<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = ColumnDefBase<TData, TValue, TFeatures> & {
  id?: string
  header?: StringOrTemplateHeader<TData, TValue, TFeatures>
}

export type DisplayColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = ColumnDefBase<TData, TValue, TFeatures> &
  ColumnIdentifiers<TData, TValue, TFeatures>

type GroupColumnDefBase<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = ColumnDefBase<TData, TValue, TFeatures> & {
  columns?: ColumnDef<TData, any>[]
}

export type GroupColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = GroupColumnDefBase<TData, TValue, TFeatures> &
  ColumnIdentifiers<TData, TValue, TFeatures>

export type AccessorFnColumnDefBase<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = ColumnDefBase<TData, TValue, TFeatures> & {
  accessorFn: AccessorFn<TData, TValue>
}

export type AccessorFnColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = AccessorFnColumnDefBase<TData, TValue, TFeatures> &
  ColumnIdentifiers<TData, TValue, TFeatures>

export type AccessorKeyColumnDefBase<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = ColumnDefBase<TData, TValue, TFeatures> & {
  id?: string
  accessorKey: (string & {}) | keyof TData
}

export type AccessorKeyColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = AccessorKeyColumnDefBase<TData, TValue, TFeatures> &
  Partial<ColumnIdentifiers<TData, TValue, TFeatures>>

export type AccessorColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> =
  | AccessorKeyColumnDef<TData, TValue, TFeatures>
  | AccessorFnColumnDef<TData, TValue, TFeatures>

//

export type ColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> =
  | DisplayColumnDef<TData, TValue, TFeatures>
  | GroupColumnDef<TData, TValue, TFeatures>
  | AccessorColumnDef<TData, TValue, TFeatures>

export type ColumnDefResolved<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = Partial<UnionToIntersection<ColumnDef<TData, TValue, TFeatures>>> & {
  accessorKey?: string
}

export type Column<
  TData extends RowData,
  TValue = unknown,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreColumn<TData, TValue, TFeatures>
  | ('ColumnFaceting' extends keyof TFeatures
      ? ColumnFacetingColumn<TData, TFeatures>
      : never)
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringColumn<TData, TFeatures>
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingColumn<TData, TFeatures>
      : never)
  | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderColumn : never)
  | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumn : never)
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumn : never)
  | ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityColumn
      : never)
  | ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumn : never)
  | ('RowSorting' extends keyof TFeatures
      ? SortingColumn<TData, TFeatures>
      : never)
>

export type Cell<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreCell<TData, TValue, TFeatures>
  | ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingCell : never)
>

export type Header<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = UnionToIntersection<
  | CoreHeader<TData, TValue, TFeatures>
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingHeader : never)
>

export interface HeaderGroup<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> extends CoreHeaderGroup<TData, TFeatures> {}
