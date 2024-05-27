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
> = CoreInstance<TData, TFeatures> &
  HeadersInstance<TData, TFeatures> &
  ('ColumnFiltering' extends keyof TFeatures
    ? ColumnFilteringInstance<TData, TFeatures>
    : {}) &
  ('ColumnGrouping' extends keyof TFeatures
    ? ColumnGroupingInstance<TData, TFeatures>
    : {}) &
  ('ColumnOrdering' extends keyof TFeatures
    ? ColumnOrderInstance<TData, TFeatures>
    : {}) &
  ('ColumnPinning' extends keyof TFeatures
    ? ColumnPinningInstance<TData, TFeatures>
    : {}) &
  ('ColumnSizing' extends keyof TFeatures
    ? ColumnSizingInstance<TData, TFeatures>
    : {}) &
  ('ColumnVisibility' extends keyof TFeatures
    ? ColumnVisibilityInstance<TData, TFeatures>
    : {}) &
  ('GlobalFiltering' extends keyof TFeatures
    ? GlobalFilterInstance<TData, TFeatures>
    : {}) &
  ('RowExpanding' extends keyof TFeatures
    ? ExpandedInstance<TData, TFeatures>
    : {}) &
  ('RowPagination' extends keyof TFeatures
    ? PaginationInstance<TData, TFeatures>
    : {}) &
  ('RowPinning' extends keyof TFeatures
    ? RowPinningInstance<TData, TFeatures>
    : {}) &
  ('RowSelection' extends keyof TFeatures
    ? RowSelectionInstance<TData, TFeatures>
    : {}) &
  ('RowSorting' extends keyof TFeatures
    ? SortingInstance<TData, TFeatures>
    : {})

export type TableOptionsResolved<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = CoreOptions<TData, TFeatures> &
  CoreRowModelOptions<TData, TFeatures> &
  ('ColumnFaceting' extends keyof TFeatures
    ? ColumnFacetingOptions<TData, TFeatures>
    : {}) &
  ('ColumnFiltering' extends keyof TFeatures
    ? ColumnFilteringOptions<TData, TFeatures>
    : {}) &
  ('ColumnGrouping' extends keyof TFeatures
    ? ColumnGroupingOptions<TData, TFeatures>
    : {}) &
  ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderOptions : {}) &
  ('ColumnPinning' extends keyof TFeatures ? ColumnPinningOptions : {}) &
  ('ColumnSizing' extends keyof TFeatures ? ColumnSizingOptions : {}) &
  ('ColumnVisibility' extends keyof TFeatures ? VisibilityOptions : {}) &
  ('GlobalFiltering' extends keyof TFeatures
    ? GlobalFilterOptions<TData, TFeatures>
    : {}) &
  ('RowExpanding' extends keyof TFeatures
    ? ExpandedOptions<TData, TFeatures>
    : {}) &
  ('RowPagination' extends keyof TFeatures ? PaginationOptions : {}) &
  ('RowPinning' extends keyof TFeatures
    ? RowPinningOptions<TData, TFeatures>
    : {}) &
  ('RowSelection' extends keyof TFeatures
    ? RowSelectionOptions<TData, TFeatures>
    : {}) &
  ('RowSorting' extends keyof TFeatures ? SortingOptions<TData, TFeatures> : {})

export type TableOptions<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = PartialKeys<
  TableOptionsResolved<TData, TFeatures>,
  'state' | 'onStateChange' | 'renderFallbackValue'
>

export type TableState<TFeatures extends TableFeatures = {}> =
  ('ColumnFiltering' extends keyof TFeatures ? ColumnFilteringTableState : {}) &
    ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingTableState : {}) &
    ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderTableState : {}) &
    ('ColumnPinning' extends keyof TFeatures ? ColumnPinningTableState : {}) &
    ('ColumnSizing' extends keyof TFeatures ? ColumnSizingTableState : {}) &
    ('ColumnVisibility' extends keyof TFeatures
      ? ColumnVisibilityTableState
      : {}) &
    ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterTableState : {}) &
    ('RowExpanding' extends keyof TFeatures ? ExpandedTableState : {}) &
    ('RowPagination' extends keyof TFeatures ? PaginationTableState : {}) &
    ('RowPinning' extends keyof TFeatures ? RowPinningTableState : {}) &
    ('RowSelection' extends keyof TFeatures ? RowSelectionTableState : {}) &
    ('RowSorting' extends keyof TFeatures ? SortingTableState : {})

export type Row<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> = CoreRow<TData, TFeatures> &
  ('ColumnFiltering' extends keyof TFeatures ? ColumnFiltersRow : {}) &
  ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingRow : {}) &
  ('ColumnPinning' extends keyof TFeatures
    ? ColumnPinningRow<TData, TFeatures>
    : {}) &
  ('ColumnVisibility' extends keyof TFeatures
    ? VisibilityRow<TData, TFeatures>
    : {}) &
  ('RowExpanding' extends keyof TFeatures ? ExpandedRow : {}) &
  ('RowPinning' extends keyof TFeatures ? RowPinningRow : {}) &
  ('RowSelection' extends keyof TFeatures ? RowSelectionRow : {})

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
> = ('ColumnVisibility' extends keyof TFeatures
  ? ColumnVisibilityColumnDef
  : {}) &
  ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumnDef : {}) &
  ('ColumnFiltering' extends keyof TFeatures
    ? ColumnFilteringColumnDef<TData, TFeatures>
    : {}) &
  ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumnDef : {}) &
  ('RowSorting' extends keyof TFeatures
    ? SortingColumnDef<TData, TFeatures>
    : {}) &
  ('ColumnGrouping' extends keyof TFeatures
    ? ColumnGroupingColumnDef<TData, TValue, TFeatures>
    : {}) &
  ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumnDef : {})

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
> = CoreColumn<TData, TValue, TFeatures> &
  ('ColumnFaceting' extends keyof TFeatures
    ? ColumnFacetingColumn<TData, TFeatures>
    : {}) &
  ('ColumnFiltering' extends keyof TFeatures
    ? ColumnFilteringColumn<TData, TFeatures>
    : {}) &
  ('ColumnGrouping' extends keyof TFeatures
    ? ColumnGroupingColumn<TData, TFeatures>
    : {}) &
  ('ColumnOrdering' extends keyof TFeatures ? ColumnOrderColumn : {}) &
  ('ColumnPinning' extends keyof TFeatures ? ColumnPinningColumn : {}) &
  ('ColumnSizing' extends keyof TFeatures ? ColumnSizingColumn : {}) &
  ('ColumnVisibility' extends keyof TFeatures ? ColumnVisibilityColumn : {}) &
  ('GlobalFiltering' extends keyof TFeatures ? GlobalFilterColumn : {}) &
  ('RowSorting' extends keyof TFeatures ? SortingColumn<TData, TFeatures> : {})

export type Cell<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = CoreCell<TData, TValue, TFeatures> &
  ('ColumnGrouping' extends keyof TFeatures ? ColumnGroupingCell : {})

export type Header<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> = CoreHeader<TData, TValue, TFeatures> &
  ('ColumnSizing' extends keyof TFeatures ? ColumnSizingHeader : {})

export interface HeaderGroup<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> extends CoreHeaderGroup<TData, TFeatures> {}
