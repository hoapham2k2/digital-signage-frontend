import {
	ColumnDef,
	RowSelectionState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

interface Props extends DataTableProps<any, any> {
	type?: "screen" | "playlist" | "content";
}

export function DataTable(props: Props) {
	const { columns, data } = props;
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
		enableRowSelection: true,
	});

	const navigate = useNavigate();

	return (
		<div className='rounded-md border shadow-md'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										onClick={() => {
											if (props.type && props.type === "screen") {
												if (cell.row.original.type === "VIRTUAL") {
													navigate(`/manage/screens/${cell.row.original.id}`);
												}
											}
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											props.type &&
												props.type !== "screen" &&
												navigate(
													`/manage/${
														props.type === "content" ? "asset" : props.type
													}s/${cell.row.original.id}`
												);
										}}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
