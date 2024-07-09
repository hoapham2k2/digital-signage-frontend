import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";

export const GroupLabelTableColumns: ColumnDef<Label>[] = [
	{
		accessorKey: "isSelected",
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
	},
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => row.original.id,
	},
	{
		accessorKey: "name",
		header: "Name",
	},
];
