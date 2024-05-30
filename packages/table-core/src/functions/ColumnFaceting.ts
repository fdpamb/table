import { ColumnFacetingOptions } from '../features/ColumnFaceting'
import { CellData, Column, RowData, Table, TableFeatures } from '../types'

export const getColumnFacetedMinMaxValues = <
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
) => {
  return table.options.getFacetedMinMaxValues?.(table, column.id) as
    | [number, number]
    | undefined
}

export const getColumnFacetedRowModel = <
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
) => {
  return (
    table.options.getFacetedRowModel?.(table, column.id) ??
    table.getPreFilteredRowModel() //TODO - use static function
  )
}

export const getColumnFacetedUniqueValues = <
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  table: Table<TFeatures, TData> & {
    options: ColumnFacetingOptions<TFeatures, TData>
  }
) => {
  return (table.options.getFacetedUniqueValues?.(table, column.id) ??
    new Map<any, number>()) as Map<any, number>
}
