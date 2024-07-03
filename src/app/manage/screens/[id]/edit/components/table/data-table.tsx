"use client";

import {
	ColumnDef,
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Playlist, Screen } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchScreenById, updateScreen } from "@/apis/screens";
import { fetchPlaylistById, updatePlaylist } from "@/apis/playlists";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	type: "screen" | "playlist";
}

export function DataTable<TData, TValue>({
	columns,
	data,
	...props
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({});
	const [isDataChanged, setIsDataChanged] = useState(false);
	const { id } = useParams<{ id: string }>();
	const queryClient = useQueryClient();

	const { data: entity } = useQuery<Screen | Playlist>({
		queryKey: [props.type, id],
		queryFn: () => {
			if (props.type === "screen") {
				return fetchScreenById(id as string);
			}
			return fetchPlaylistById(id as string);
		},
		enabled: !!id,
	});
	useEffect(() => {
		if (entity) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			const selectedGroupIds: string[] = entity.groups;
			const rowSelection: Record<string, boolean> = {};
			selectedGroupIds.forEach((groupId) => {
				rowSelection[groupId] = true;
			});
			setRowSelection(rowSelection);
		}
	}, [entity]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
		getRowId: (row: any) => row.id,
	});

	//using useEffect to handle isDataChanged when selected rows change

	useEffect(() => {
		const selectedGroupIds = Object.keys(rowSelection);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		const selectedGroupIdsFromEntity = entity?.groups;
		if (
			selectedGroupIds.length !== selectedGroupIdsFromEntity?.length ||
			selectedGroupIds.some((id) => !selectedGroupIdsFromEntity?.includes(id))
		) {
			setIsDataChanged(true);
		} else {
			setIsDataChanged(false);
		}
	}, [rowSelection]);

	const { mutate: updateEntity } = useMutation(
		(newEntity: Omit<Screen, "id"> | Omit<Playlist, "id">) => {
			if (props.type === "screen") {
				return updateScreen(id as string, newEntity as Omit<Screen, "id">);
			}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			return updatePlaylist(id as string, newEntity as Omit<Playlist, "id">);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [props.type, id],
				});
				setIsDataChanged(false);
			},
		}
	);

	const handlleSaveEntity = () => {
		let updatedEntity: Omit<Screen, "id"> | Omit<Playlist, "id">;
		if (props.type === "playlist") {
			updatedEntity = {
				...entity,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				groups: Object.keys(rowSelection),
			} as Omit<Playlist, "id">;
		} else {
			updatedEntity = {
				...entity,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				groups: Object.keys(rowSelection),
			} as Omit<Screen, "id">;
		}

		updateEntity(updatedEntity);
	};

	return (
		<div className='rounded-md border'>
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
									<TableCell key={cell.id}>
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

			{
				// Show Save button only if isDataChanged is true
				isDataChanged && <Button onClick={handlleSaveEntity}>Save</Button>
			}
			<div className='flex-1 text-sm text-muted-foreground'>
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
		</div>
	);
}
