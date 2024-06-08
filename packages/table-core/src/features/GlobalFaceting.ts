import { RowModel } from '..'
import {
  table_getGlobalFacetedMinMaxValues,
  table_getGlobalFacetedRowModel,
  table_getGlobalFacetedUniqueValues,
} from '../functions/GlobalFacetingFns'
import { Table, RowData, TableFeature, TableFeatures } from '../types'

export interface GlobalFacetingTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  /**
   * Currently, this function returns the built-in `includesString` filter function. In future releases, it may return more dynamic filter functions based on the nature of the data provided.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/global-faceting#getglobalautofilterfn)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/global-faceting)
   */
  getGlobalFacetedMinMaxValues: () => undefined | [number, number]
  /**
   * Returns the row model for the table after **global** filtering has been applied.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/global-faceting#getglobalfacetedrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/global-faceting)
   */
  getGlobalFacetedRowModel: () => RowModel<TFeatures, TData>
  /**
   * Returns the faceted unique values for the global filter.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/global-faceting#getglobalfaceteduniquevalues)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/global-faceting)
   */
  getGlobalFacetedUniqueValues: () => Map<any, number>
}

//

export const GlobalFaceting: TableFeature = {
  createTable: <_TFeatures extends TableFeatures, TData extends RowData>(
    table: Table<{ GlobalFaceting: any }, TData>
  ): void => {
    table.getGlobalFacetedMinMaxValues = () =>
      table_getGlobalFacetedMinMaxValues(table)
    table.getGlobalFacetedRowModel = () => table_getGlobalFacetedRowModel(table)
    table.getGlobalFacetedUniqueValues = () =>
      table_getGlobalFacetedUniqueValues(table)
  },
}
