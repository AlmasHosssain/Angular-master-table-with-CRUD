export interface TableColumn {
  tableColumnName: string,
  key: string,
  position?: 'right' | 'left',
  isSortAble?: boolean,
  isAction?: boolean,
  action? : any[]
}