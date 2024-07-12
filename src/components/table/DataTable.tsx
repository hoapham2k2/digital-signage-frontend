import {
	ColumnDef,
	RowSelectionState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
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
import { Button } from "@/components/ui/button";

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

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});

	const table = useReactTable({
		data,
		columns,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			rowSelection,
			pagination,
		},
	});

	const navigate = useNavigate();

	return (
		<div>
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex justify-end mt-4 gap-2'>
				<span className='flex items-center '>
					Page {pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
				<div className='flex items-center justify-end space-x-2 py-4'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
