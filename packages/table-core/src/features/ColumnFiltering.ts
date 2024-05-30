import { RowModel, TableFeatures } from '..'
import { BuiltInFilterFn, filterFns } from '../filterFns'
import {
  CellData,
  Column,
  FilterFns,
  FilterMeta,
  OnChangeFn,
  Row,
  RowData,
  Table,
  TableFeature,
  Updater,
} from '../types'
import { functionalUpdate, isFunction, makeStateUpdater } from '../utils'

export interface ColumnFilteringTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}

export interface ResolvedColumnFilter<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  filterFn: FilterFn<TFeatures, TData>
  id: string
  resolvedValue: unknown
}

export interface FilterFn<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  (
    row: Row<TFeatures, TData>,
    columnId: string,
    filterValue: any,
    addMeta: (meta: FilterMeta) => void
  ): boolean
  autoRemove?: ColumnFilterAutoRemoveTestFn<TFeatures, TData>
  resolveFilterValue?: TransformFilterValueFn<TFeatures, TData>
}

export type TransformFilterValueFn<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = (value: any, column?: Column<TFeatures, TData, unknown>) => unknown

export type ColumnFilterAutoRemoveTestFn<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = (value: any, column?: Column<TFeatures, TData, unknown>) => boolean

export type CustomFilterFns<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = Record<string, FilterFn<TFeatures, TData>>

export type FilterFnOption<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = 'auto' | BuiltInFilterFn | keyof FilterFns | FilterFn<TFeatures, TData>

export interface ColumnFilteringColumnDef<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  /**
   * Enables/disables the **column** filter for this column.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#enablecolumnfilter)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  enableColumnFilter?: boolean
  /**
   * The filter function to use with this column. Can be the name of a built-in filter function or a custom filter function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#filterfn)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  filterFn?: FilterFnOption<TFeatures, TData>
}

export interface ColumnFilteringColumn<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  /**
   * Returns an automatically calculated filter function for the column based off of the columns first known value.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getautofilterfn)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getAutoFilterFn: () => FilterFn<TFeatures, TData> | undefined
  /**
   * Returns whether or not the column can be **column** filtered.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getcanfilter)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getCanFilter: () => boolean
  /**
   * Returns the filter function (either user-defined or automatic, depending on configuration) for the columnId specified.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getfilterfn)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getFilterFn: () => FilterFn<TFeatures, TData> | undefined
  /**
   * Returns the index (including `-1`) of the column filter in the table's `state.columnFilters` array.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getfilterindex)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getFilterIndex: () => number
  /**
   * Returns the current filter value for the column.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getfiltervalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getFilterValue: () => unknown
  /**
   * Returns whether or not the column is currently filtered.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getisfiltered)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getIsFiltered: () => boolean
  /**
   * A function that sets the current filter value for the column. You can pass it a value or an updater function for immutability-safe operations on existing values.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#setfiltervalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  setFilterValue: (updater: Updater<any>) => void
}

export interface ColumnFiltersRow {
  /**
   * The column filters map for the row. This object tracks whether a row is passing/failing specific filters by their column ID.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#columnfilters)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  columnFilters: Record<string, boolean>
  /**
   * The column filters meta map for the row. This object tracks any filter meta for a row as optionally provided during the filtering process.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#columnfiltersmeta)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  columnFiltersMeta: Record<string, FilterMeta>
}

interface ColumnFilteringOptionsBase<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  /**
   * Enables/disables **column** filtering for all columns.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#enablecolumnfilters)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  enableColumnFilters?: boolean
  /**
   * Enables/disables all filtering for the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#enablefilters)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  enableFilters?: boolean
  /**
   * By default, filtering is done from parent rows down (so if a parent row is filtered out, all of its children will be filtered out as well). Setting this option to `true` will cause filtering to be done from leaf rows up (which means parent rows will be included so long as one of their child or grand-child rows is also included).
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#filterfromleafrows)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  filterFromLeafRows?: boolean
  /**
   * If provided, this function is called **once** per table and should return a **new function** which will calculate and return the row model for the table when it's filtered.
   * - For server-side filtering, this function is unnecessary and can be ignored since the server should already return the filtered row model.
   * - For client-side filtering, this function is required. A default implementation is provided via any table adapter's `{ getFilteredRowModel }` export.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getfilteredrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getFilteredRowModel?: (
    table: Table<TFeatures, TData>
  ) => () => RowModel<TFeatures, TData>
  /**
   * Disables the `getFilteredRowModel` from being used to filter data. This may be useful if your table needs to dynamically support both client-side and server-side filtering.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#manualfiltering)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  manualFiltering?: boolean
  /**
   * By default, filtering is done for all rows (max depth of 100), no matter if they are root level parent rows or the child leaf rows of a parent row. Setting this option to `0` will cause filtering to only be applied to the root level parent rows, with all sub-rows remaining unfiltered. Similarly, setting this option to `1` will cause filtering to only be applied to child leaf rows 1 level deep, and so on.

   * This is useful for situations where you want a row's entire child hierarchy to be visible regardless of the applied filter.
    * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#maxleafrowfilterdepth)
    * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  maxLeafRowFilterDepth?: number
  /**
   * If provided, this function will be called with an `updaterFn` when `state.columnFilters` changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#oncolumnfilterschange)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
}

type ResolvedFilterFns<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = keyof FilterFns extends never
  ? {
      filterFns?: Record<string, FilterFn<TFeatures, TData>>
    }
  : {
      filterFns: Record<keyof FilterFns, FilterFn<TFeatures, TData>>
    }

export interface ColumnFilteringOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
> extends ColumnFilteringOptionsBase<TFeatures, TData>,
    ResolvedFilterFns<TFeatures, TData> {}

export interface ColumnFilteringTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  _getFilteredRowModel?: () => RowModel<TFeatures, TData>
  /**
   * Returns the row model for the table after **column** filtering has been applied.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getfilteredrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getFilteredRowModel: () => RowModel<TFeatures, TData>
  /**
   * Returns the row model for the table before any **column** filtering has been applied.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#getprefilteredrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  getPreFilteredRowModel: () => RowModel<TFeatures, TData>
  /**
   * Resets the **columnFilters** state to `initialState.columnFilters`, or `true` can be passed to force a default blank state reset to `[]`.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#resetcolumnfilters)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  resetColumnFilters: (defaultState?: boolean) => void
  /**
   * Resets the **globalFilter** state to `initialState.globalFilter`, or `true` can be passed to force a default blank state reset to `undefined`.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#resetglobalfilter)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  resetGlobalFilter: (defaultState?: boolean) => void
  /**
   * Sets or updates the `state.columnFilters` state.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#setcolumnfilters)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void
  /**
   * Sets or updates the `state.globalFilter` state.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-filtering#setglobalfilter)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-filtering)
   */
  setGlobalFilter: (updater: Updater<any>) => void
}

//

export const ColumnFiltering: TableFeature = {
  getDefaultColumnDef: <
    TFeatures extends TableFeatures,
    TData extends RowData,
  >(): ColumnFilteringColumnDef<TFeatures, TData> => {
    return {
      filterFn: 'auto',
    }
  },

  getInitialState: (state): ColumnFilteringTableState => {
    return {
      columnFilters: [],
      ...state,
    }
  },

  getDefaultOptions: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
  ): ColumnFilteringOptions<TFeatures, TData> => {
    return {
      onColumnFiltersChange: makeStateUpdater('columnFilters', table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100,
    } as ColumnFilteringOptions<TFeatures, TData>
  },

  createColumn: <
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >(
    column: Column<TFeatures, TData, TValue>,
    table: Table<TFeatures, TData>
  ): void => {
    column.getAutoFilterFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0]

      const value = firstRow?.getValue(column.id)

      if (typeof value === 'string') {
        return filterFns.includesString
      }

      if (typeof value === 'number') {
        return filterFns.inNumberRange
      }

      if (typeof value === 'boolean') {
        return filterFns.equals
      }

      if (value !== null && typeof value === 'object') {
        return filterFns.equals
      }

      if (Array.isArray(value)) {
        return filterFns.arrIncludes
      }

      return filterFns.weakEquals
    }
    column.getFilterFn = () => {
      return isFunction(column.columnDef.filterFn)
        ? column.columnDef.filterFn
        : column.columnDef.filterFn === 'auto'
          ? column.getAutoFilterFn()
          : // @ts-ignore
            table.options.filterFns?.[column.columnDef.filterFn as string] ??
            filterFns[column.columnDef.filterFn as BuiltInFilterFn]
    }
    column.getCanFilter = () => {
      return (
        (column.columnDef.enableColumnFilter ?? true) &&
        (table.options.enableColumnFilters ?? true) &&
        (table.options.enableFilters ?? true) &&
        !!column.accessorFn
      )
    }

    column.getIsFiltered = () => column.getFilterIndex() > -1

    column.getFilterValue = () =>
      table.getState().columnFilters?.find(d => d.id === column.id)?.value

    column.getFilterIndex = () =>
      table.getState().columnFilters?.findIndex(d => d.id === column.id) ?? -1

    column.setFilterValue = value => {
      table.setColumnFilters(old => {
        const filterFn = column.getFilterFn()
        const previousFilter = old?.find(d => d.id === column.id)

        const newFilter = functionalUpdate(
          value,
          previousFilter ? previousFilter.value : undefined
        )

        //
        if (
          shouldAutoRemoveFilter(
            filterFn as FilterFn<TFeatures, TData>,
            newFilter,
            column
          )
        ) {
          return old?.filter(d => d.id !== column.id) ?? []
        }

        const newFilterObj = { id: column.id, value: newFilter }

        if (previousFilter) {
          return (
            old?.map(d => {
              if (d.id === column.id) {
                return newFilterObj
              }
              return d
            }) ?? []
          )
        }

        if (old?.length) {
          return [...old, newFilterObj]
        }

        return [newFilterObj]
      })
    }
  },

  createRow: <TFeatures extends TableFeatures, TData extends RowData>(
    row: Row<TFeatures, TData>,
    _table: Table<TFeatures, TData>
  ): void => {
    row.columnFilters = {}
    row.columnFiltersMeta = {}
  },

  createTable: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<TFeatures, TData>
  ): void => {
    table.setColumnFilters = (updater: Updater<ColumnFiltersState>) => {
      const leafColumns = table.getAllLeafColumns()

      const updateFn = (old: ColumnFiltersState) => {
        return functionalUpdate(updater, old)?.filter(filter => {
          const column = leafColumns.find(d => d.id === filter.id)

          if (column) {
            const filterFn = column.getFilterFn()

            if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
              return false
            }
          }

          return true
        })
      }

      table.options.onColumnFiltersChange?.(updateFn)
    }

    table.resetColumnFilters = defaultState => {
      table.setColumnFilters(
        defaultState ? [] : table.initialState?.columnFilters ?? []
      )
    }

    table.getPreFilteredRowModel = () => table.getCoreRowModel()
    table.getFilteredRowModel = () => {
      if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
        table._getFilteredRowModel = table.options.getFilteredRowModel(table)
      }

      if (table.options.manualFiltering || !table._getFilteredRowModel) {
        return table.getPreFilteredRowModel()
      }

      return table._getFilteredRowModel()
    }
  },
}

export function shouldAutoRemoveFilter<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  filterFn?: FilterFn<TFeatures, TData>,
  value?: any,
  column?: Column<TFeatures, TData, unknown>
) {
  return (
    (filterFn && filterFn.autoRemove
      ? filterFn.autoRemove(value, column)
      : false) ||
    typeof value === 'undefined' ||
    (typeof value === 'string' && !value)
  )
}
