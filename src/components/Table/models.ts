export interface TableProps {
  content: {
    tableHead?: TableHead;
    tableBody?: TableBody;
  };
}

interface TableHead extends TableSection {}

interface TableBody extends TableSection {}

interface TableSection {
  content: TableRow[];
}

interface TableRow {
  row: TableCell[];
}

interface TableCell {
  cell: string;
}
