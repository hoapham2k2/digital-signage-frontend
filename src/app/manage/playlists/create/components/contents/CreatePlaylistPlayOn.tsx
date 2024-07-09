import { fetchGroups } from "@/apis/groups";
import { useAuth } from "@/context/AuthContext";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import Select from "react-select";
import { CreatePlaylistFormFields } from "../../CreatePlaylistPage";
import { Label, PlaylistLabels } from "@/types";
const CreatePlaylistPlayOn = () => {
	const { user } = useAuth();
	const methods = useFormContext<CreatePlaylistFormFields>();
	const { replace } = useFieldArray({
		control: methods.control,
		name: "playlistLabels",
	});

	const { data: groups } = useQuery({
		queryKey: "playlist-play-on",
		queryFn: () => {
			return fetchGroups(user?.id || "");
		},
	});
	const options = groups
		?.filter((group: Label, index: number, self: Label[]) => {
			return self.findIndex((g: Label) => g.name === group.name) === index;
		})
		.map((group: Label) => ({
			value: group.id,
			label: group.name,
		}));

	return (
		<div className='flex flex-col gap-2'>
			<label>Play On</label>
			<Select
				isMulti
				options={options}
				onChange={(selectedOptions) => {
					const transformedArray: PlaylistLabels[] = selectedOptions.map(
						(option: { value: any; label: any }) => ({
							playlist_id: 0,
							label_id: Number(option.value),
						})
					);

					replace(transformedArray);
				}}
			/>
		</div>
	);
};

export default CreatePlaylistPlayOn;
