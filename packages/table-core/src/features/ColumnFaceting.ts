import { RowModel, TableFeatures } from '..'
import { Column, RowData, Table, TableFeature } from '../types'

export interface ColumnFacetingColumn<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {
  _getFacetedMinMaxValues?: () => undefined | [number, number]
  _getFacetedRowModel?: () => RowModel<TData, TFeatures>
  _getFacetedUniqueValues?: () => Map<any, number>
  /**
   * A function that **computes and returns** a min/max tuple derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.
   * > ⚠️ Requires that you pass a valid `getFacetedMinMaxValues` function to `options.getFacetedMinMaxValues`. A default implementation is provided via the exported `getFacetedMinMaxValues` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfacetedminmaxvalues)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedMinMaxValues: () => undefined | [number, number]
  /**
   * Returns the row model with all other column filters applied, excluding its own filter. Useful for displaying faceted result counts.
   * > ⚠️ Requires that you pass a valid `getFacetedRowModel` function to `options.facetedRowModel`. A default implementation is provided via the exported `getFacetedRowModel` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfacetedrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedRowModel: () => RowModel<TData, TFeatures>
  /**
   * A function that **computes and returns** a `Map` of unique values and their occurrences derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.
   * > ⚠️ Requires that you pass a valid `getFacetedUniqueValues` function to `options.getFacetedUniqueValues`. A default implementation is provided via the exported `getFacetedUniqueValues` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfaceteduniquevalues)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedUniqueValues: () => Map<any, number>
}

export interface ColumnFacetingOptions<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {
  getFacetedMinMaxValues?: (
    table: Table<TData, TFeatures>,
    columnId: string
  ) => () => undefined | [number, number]
  getFacetedRowModel?: (
    table: Table<TData, TFeatures>,
    columnId: string
  ) => () => RowModel<TData, TFeatures>
  getFacetedUniqueValues?: (
    table: Table<TData, TFeatures>,
    columnId: string
  ) => () => Map<any, number>
}

//

export const ColumnFaceting: TableFeature = {
  createColumn: <
    TData extends RowData,
    TValue,
    TFeatures extends TableFeatures = {},
  >(
    column: Column<TData, TValue, TFeatures>,
    table: Table<TData, TFeatures>
  ): void => {
    column._getFacetedRowModel =
      table.options.getFacetedRowModel &&
      table.options.getFacetedRowModel(table, column.id)
    column.getFacetedRowModel = () => {
      if (!column._getFacetedRowModel) {
        return table.getPreFilteredRowModel()
      }

      return column._getFacetedRowModel()
    }
    column._getFacetedUniqueValues =
      table.options.getFacetedUniqueValues &&
      table.options.getFacetedUniqueValues(table, column.id)
    column.getFacetedUniqueValues = () => {
      if (!column._getFacetedUniqueValues) {
        return new Map()
      }

      return column._getFacetedUniqueValues()
    }
    column._getFacetedMinMaxValues =
      table.options.getFacetedMinMaxValues &&
      table.options.getFacetedMinMaxValues(table, column.id)
    column.getFacetedMinMaxValues = () => {
      if (!column._getFacetedMinMaxValues) {
        return undefined
      }

      return column._getFacetedMinMaxValues()
    }
  },
}
