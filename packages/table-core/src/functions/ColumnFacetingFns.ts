import { ColumnFacetingOptions } from '../features/ColumnFaceting'
import { CellData, Column, RowData, Table, TableFeatures } from '../types'

// These functions can only assume that the APIs/types from the ColumnFaceting feature are available

export function getColumnFacetedMinMaxValues<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
): [number, number] | undefined {
  return table.options.getFacetedMinMaxValues?.(table, column.id) as
    | [number, number]
    | undefined
}

export function getColumnFacetedRowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
) {
  return (
    table.options.getFacetedRowModel?.(table, column.id) ??
    table.getPreFilteredRowModel() // TODO - reference static function
  )
}

export function getColumnFacetedUniqueValues<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
) {
  return (table.options.getFacetedUniqueValues?.(table, column.id) ??
    new Map<any, number>()) as Map<any, number>
}
