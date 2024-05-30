import {
  RowData,
  Cell,
  Column,
  Row,
  Table,
  TableFeatures,
  CellData,
} from '../types'
import { Getter, getMemoOptions, memo } from '../utils'

export interface CellContext<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> {
  cell: Cell<TFeatures, TData, TValue>
  column: Column<TFeatures, TData, TValue>
  getValue: Getter<TValue>
  renderValue: Getter<TValue | null>
  row: Row<TFeatures, TData>
  table: Table<TFeatures, TData>
}

export interface CoreCell<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
> {
  /**
   * The associated Column object for the cell.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#column)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  column: Column<TFeatures, TData, TValue>
  /**
   * Returns the rendering context (or props) for cell-based components like cells and aggregated cells. Use these props with your framework's `flexRender` utility to render these using the template of your choice:
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#getcontext)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  getContext: () => CellContext<TFeatures, TData, TValue>
  /**
   * Returns the value for the cell, accessed via the associated column's accessor key or accessor function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#getvalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  getValue: CellContext<TFeatures, TData, TValue>['getValue']
  /**
   * The unique ID for the cell across the entire table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#id)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  id: string
  /**
   * Renders the value for a cell the same as `getValue`, but will return the `renderFallbackValue` if no value is found.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#rendervalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  renderValue: CellContext<TFeatures, TData, TValue>['renderValue']
  /**
   * The associated Row object for the cell.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#row)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  row: Row<TFeatures, TData>
}

export function createCell<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData,
>(
  table: Table<TFeatures, TData>,
  row: Row<TFeatures, TData>,
  column: Column<TFeatures, TData, TValue>,
  columnId: string
): Cell<TFeatures, TData, TValue> {
  const getRenderValue = () =>
    cell.getValue() ?? table.options.renderFallbackValue

  const cell: CoreCell<TFeatures, TData, TValue> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(
      () => [table, column, row, cell],
      (table, column, row, cell) => ({
        table,
        column,
        row,
        cell: cell as Cell<TFeatures, TData, TValue>,
        getValue: cell.getValue,
        renderValue: cell.renderValue,
      }),
      getMemoOptions(table.options, 'debugCells', 'cell.getContext')
    ),
  }

  Object.values(table._features).forEach(feature => {
    feature.createCell?.(
      cell as Cell<TFeatures, TData, TValue>,
      column,
      row,
      table
    )
  }, {})

  return cell as Cell<TFeatures, TData, TValue>
}
