import { ColumnFacetingOptions } from '../features/ColumnFaceting'
import { ColumnFilteringOptions } from '../features/ColumnFiltering'
import { GlobalFacetingTable } from '../features/GlobalFaceting'
import { RowData, Table, TableFeatures } from '../types'

// These functions can only assume that the APIs/types from the GlobalFaceting and ColumnFaceting features are available

export function getTableGlobalFacetedMinMaxValues<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  table: Table<TFeatures, TData> &
    GlobalFacetingTable<TFeatures, TData> & {
      options: ColumnFacetingOptions<TFeatures, TData>
    }
): [number, number] | undefined {
  return table.options.getFacetedMinMaxValues?.(table, '__global__') as
    | [number, number]
    | undefined
}

export function getTableGlobalFacetedRowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  table: Table<TFeatures, TData> &
    GlobalFacetingTable<TFeatures, TData> & {
      options: ColumnFacetingOptions<TFeatures, TData> &
        ColumnFilteringOptions<TFeatures, TData>
    }
) {
  return (
    (!table.options.manualFiltering
      ? table.options.getFacetedRowModel?.(table, '__global__')
      : null) ?? table.getPreFilteredRowModel() // TODO - reference static function
  )
}

export function getTableGlobalFacetedUniqueValues<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  table: Table<TFeatures, TData> &
    GlobalFacetingTable<TFeatures, TData> & {
      options: ColumnFacetingOptions<TFeatures, TData>
    }
) {
  return (table.options.getFacetedUniqueValues?.(table, '__global__') ??
    new Map<any, number>()) as Map<any, number>
}
