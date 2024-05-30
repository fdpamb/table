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
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >(
    cell: Cell<TFeatures, TData, TValue>,
    column: Column<TFeatures, TData, TValue>,
    row: Row<TFeatures, TData>,
    table: Table<TFeatures, TData>
  ) => void
  createColumn?: <
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >(
    column: Column<TFeatures, TData, TValue>,
    table: Table<TFeatures, TData>
  ) => void
  createHeader?: <
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >(
    header: Header<TFeatures, TData, TValue>,
    table: Table<TFeatures, TData>
  ) => void
  createRow?: <TFeatures extends TableFeatures, TData extends RowData>(
    row: Row<TFeatures, TData>,
    table: Table<TFeatures, TData>
  ) => void
  createTable?: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
  ) => void
  getDefaultColumnDef?: <
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >() => Partial<ColumnDef<TFeatures, TData, TValue>>
  getDefaultOptions?: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
  ) => Partial<TableOptionsResolved<TFeatures, TData>>
  getInitialState?: <TFeatures extends TableFeatures>(
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
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

export interface ColumnMeta<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> {}

export interface FilterMeta {}

export interface FilterFns {}

export interface SortingFns {}

export interface AggregationFns {}

export type Updater<T> = T | ((old: T) => T)
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void

export type RowData = Record<string, unknown>
export type CellData = unknown

export type AnyRender = (Comp: any, props: any) => any

export type Table<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = (CoreInstance<TFeatures, TData> & HeadersInstance<TFeatures, TData>) &
  UnionToIntersection<
    | ('ColumnFiltering' extends keyof TFeatures
        ? ColumnFilteringInstance<TFeatures, TData>
        : never)
    | ('ColumnGrouping' extends keyof TFeatures
        ? ColumnGroupingInstance<TFeatures, TData>
        : never)
    | ('ColumnOrdering' extends keyof TFeatures
        ? ColumnOrderInstance<TFeatures, TData>
        : never)
    | ('ColumnPinning' extends keyof TFeatures
        ? ColumnPinningInstance<TFeatures, TData>
        : never)
    | ('ColumnSizing' extends keyof TFeatures
        ? ColumnSizingInstance<TFeatures, TData>
        : never)
    | ('ColumnVisibility' extends keyof TFeatures
        ? ColumnVisibilityInstance<TFeatures, TData>
        : never)
    | ('GlobalFaceting' extends keyof TFeatures
        ? GlobalFacetingInstance<TFeatures, TData>
        : never)
    | ('GlobalFiltering' extends keyof TFeatures
        ? GlobalFilterInstance<TFeatures, TData>
        : never)
    | ('RowExpanding' extends keyof TFeatures
        ? ExpandedInstance<TFeatures, TData>
        : never)
    | ('RowPagination' extends keyof TFeatures
        ? PaginationInstance<TFeatures, TData>
        : never)
    | ('RowPinning' extends keyof TFeatures
        ? RowPinningInstance<TFeatures, TData>
        : never)
    | ('RowSelection' extends keyof TFeatures
        ? RowSelectionInstance<TFeatures, TData>
        : never)
    | ('RowSorting' extends keyof TFeatures
        ? SortingInstance<TFeatures, TData>
        : never)
  >

export type TableOptionsResolved<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = (CoreOptions<TFeatures, TData> & CoreRowModelOptions<TFeatures, TData>) &
  UnionToIntersection<
    | ('ColumnFaceting' extends keyof TFeatures
        ? ColumnFacetingOptions<TFeatures, TData>
        : never)
    | ('ColumnFiltering' extends keyof TFeatures
        ? ColumnFilteringOptions<TFeatures, TData>
        : never)
    | ('ColumnGrouping' extends keyof TFeatures
        ? ColumnGroupingOptions<TFeatures, TData>
        : never)
    | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderOptions : never)
    | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningOptions : never)
    | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingOptions : never)
    | ('ColumnVisibility' extends keyof TFeatures ? VisibilityOptions : never)
    | ('GlobalFiltering' extends keyof TFeatures
        ? GlobalFilterOptions<TFeatures, TData>
        : never)
    | ('RowExpanding' extends keyof TFeatures
        ? ExpandedOptions<TFeatures, TData>
        : never)
    | ('RowPagination' extends keyof TFeatures
        ? PaginationOptions<TFeatures, TData>
        : never)
    | ('RowPinning' extends keyof TFeatures
        ? RowPinningOptions<TFeatures, TData>
        : never)
    | ('RowSelection' extends keyof TFeatures
        ? RowSelectionOptions<TFeatures, TData>
        : never)
    | ('RowSorting' extends keyof TFeatures
        ? SortingOptions<TFeatures, TData>
        : never)
  >

export type TableOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = PartialKeys<
  TableOptionsResolved<TFeatures, TData>,
  'state' | 'onStateChange' | 'renderFallbackValue'
>

export type TableState<TFeatures extends TableFeatures> = UnionToIntersection<
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringTableState
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingTableState
      : never)
  | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderTableState : never)
  | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningTableState : never)
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingTableState : never)
  | ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityTableState
      : never)
  | ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterTableState : never)
  | ('RowExpanding' extends keyof TFeatures ? ExpandedTableState : never)
  | ('RowPagination' extends keyof TFeatures ? PaginationTableState : never)
  | ('RowPinning' extends keyof TFeatures ? RowPinningTableState : never)
  | ('RowSelection' extends keyof TFeatures ? RowSelectionTableState : never)
  | ('RowSorting' extends keyof TFeatures ? SortingTableState : never)
>

export type Row<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = CoreRow<TFeatures, TData> &
  UnionToIntersection<
    | ('ColumnFiltering' extends keyof TFeatures ? ColumnFiltersRow : never)
    | ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingRow : never)
    | ('ColumnPinning' extends keyof TFeatures
        ? ColumnPinningRow<TFeatures, TData>
        : never)
    | ('ColumnVisibility' extends keyof TFeatures
        ? VisibilityRow<TFeatures, TData>
        : never)
    | ('RowExpanding' extends keyof TFeatures ? ExpandedRow : never)
    | ('RowPinning' extends keyof TFeatures ? RowPinningRow : never)
    | ('RowSelection' extends keyof TFeatures ? RowSelectionRow : never)
  >

export interface RowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  rows: Row<TFeatures, TData>[]
  flatRows: Row<TFeatures, TData>[]
  rowsById: Record<string, Row<TFeatures, TData>>
}

export type AccessorFn<TData extends RowData, TValue = unknown> = (
  originalRow: TData,
  index: number
) => TValue

export type ColumnDefTemplate<TProps extends object> =
  | string
  | ((props: TProps) => any)

export type StringOrTemplateHeader<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = string | ColumnDefTemplate<HeaderContext<TFeatures, TData, TValue>>

export interface StringHeaderIdentifier {
  header: string
  id?: string
}

export interface IdIdentifier<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> {
  id: string
  header?: StringOrTemplateHeader<TFeatures, TData, TValue>
}

type ColumnIdentifiers<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = IdIdentifier<TFeatures, TData, TValue> | StringHeaderIdentifier

//

type ColumnDefExtensions<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = UnionToIntersection<
  | ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityColumnDef
      : never)
  | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumnDef : never)
  | ('ColumnFiltering' extends keyof TFeatures
      ? ColumnFilteringColumnDef<TFeatures, TData>
      : never)
  | ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumnDef : never)
  | ('RowSorting' extends keyof TFeatures
      ? SortingColumnDef<TFeatures, TData>
      : never)
  | ('ColumnGrouping' extends keyof TFeatures
      ? ColumnGroupingColumnDef<TFeatures, TData, TValue>
      : never)
  | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumnDef : never)
>

export type ColumnDefBase<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefExtensions<TFeatures, TData, TValue> & {
  getUniqueValues?: AccessorFn<TData, unknown[]>
  footer?: ColumnDefTemplate<HeaderContext<TFeatures, TData, TValue>>
  cell?: ColumnDefTemplate<CellContext<TFeatures, TData, TValue>>
  meta?: ColumnMeta<TFeatures, TData, TValue>
}

//

export type IdentifiedColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefBase<TFeatures, TData, TValue> & {
  id?: string
  header?: StringOrTemplateHeader<TFeatures, TData, TValue>
}

export type DisplayColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefBase<TFeatures, TData, TValue> &
  ColumnIdentifiers<TFeatures, TData, TValue>

type GroupColumnDefBase<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefBase<TFeatures, TData, TValue> & {
  columns?: ColumnDef<TFeatures, TData, TValue>[]
}

export type GroupColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = GroupColumnDefBase<TFeatures, TData, TValue> &
  ColumnIdentifiers<TFeatures, TData, TValue>

export type AccessorFnColumnDefBase<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefBase<TFeatures, TData, TValue> & {
  accessorFn: AccessorFn<TData, TValue>
}

export type AccessorFnColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = AccessorFnColumnDefBase<TFeatures, TData, TValue> &
  ColumnIdentifiers<TFeatures, TData, TValue>

export type AccessorKeyColumnDefBase<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = ColumnDefBase<TFeatures, TData, TValue> & {
  id?: string
  accessorKey: (string & {}) | keyof TData
}

export type AccessorKeyColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = AccessorKeyColumnDefBase<TFeatures, TData, TValue> &
  Partial<ColumnIdentifiers<TFeatures, TData, TValue>>

export type AccessorColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> =
  | AccessorKeyColumnDef<TFeatures, TData, TValue>
  | AccessorFnColumnDef<TFeatures, TData, TValue>

//

export type ColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> =
  | DisplayColumnDef<TFeatures, TData, TValue>
  | GroupColumnDef<TFeatures, TData, TValue>
  | AccessorColumnDef<TFeatures, TData, TValue>

export type ColumnDefResolved<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = Partial<UnionToIntersection<ColumnDef<TFeatures, TData, TValue>>> & {
  accessorKey?: string
}

export type Column<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = CoreColumn<TFeatures, TData, TValue> &
  UnionToIntersection<
    | ('ColumnFaceting' extends keyof TFeatures
        ? ColumnFacetingColumn<TFeatures, TData>
        : never)
    | ('ColumnFiltering' extends keyof TFeatures
        ? ColumnFilteringColumn<TFeatures, TData>
        : never)
    | ('ColumnGrouping' extends keyof TFeatures
        ? ColumnGroupingColumn<TFeatures, TData>
        : never)
    | ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderColumn : never)
    | ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumn : never)
    | ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumn : never)
    | ('ColumnVisibility' extends keyof TFeatures
        ? ColumnVisibilityColumn
        : never)
    | ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumn : never)
    | ('RowSorting' extends keyof TFeatures
        ? SortingColumn<TFeatures, TData>
        : never)
  >

export type Cell<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = CoreCell<TFeatures, TData, TValue> &
  UnionToIntersection<
    'ColumnGrouping' extends keyof TFeatures ? ColumnGroupingCell : never
  >

export type Header<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> = CoreHeader<TFeatures, TData, TValue> &
  UnionToIntersection<
    'ColumnSizing' extends keyof TFeatures ? ColumnSizingHeader : never
  >

export interface HeaderGroup<
  TFeatures extends TableFeatures,
  TData extends RowData,
> extends CoreHeaderGroup<TFeatures, TData> {}
