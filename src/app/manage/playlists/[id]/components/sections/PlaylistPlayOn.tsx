import { useFieldArray, useFormContext } from "react-hook-form";
import { PlaylistFormValueTypes } from "../../page";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "react-query";
import { fetchGroups } from "@/apis/groups";
import { Label, PlaylistLabels } from "@/types";
import Select from "react-select";
import { useParams } from "react-router-dom";
const PlaylistPlayOn = () => {
	const { user } = useAuth();
	const { id: playlistId } = useParams<{ id: string }>();
	const methods = useFormContext<PlaylistFormValueTypes>();
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
		// ?.filter((group: Label, index: number, self: Label[]) => {
		// 	return self.findIndex((g: Label) => g.name === group.name) === index;
		// })
		?.map((group: Label) => ({
			value: group.id,
			label: group.name,
		}));

	const values = methods.getValues("playlistLabels");

	const handleRenderValue = (): { value: number; label: string }[] => {
		if (!values) {
			return [];
		}
		if (values.length === 0) {
			return [];
		}
		return values.map((value: PlaylistLabels) => {
			const group = groups?.find((g: Label) => g.id === value.label_id);
			return {
				value: value.label_id,
				label: group?.name || "",
			};
		});
	};

	return (
		<div className='flex flex-col gap-2'>
			<label>Play On</label>
			<Select
				theme={(theme) => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary25: "lightgray",
						primary: "black",
					},
				})}
				isMulti
				options={options}
				onChange={(selectedOptions) => {
					const transformedArray: PlaylistLabels[] = selectedOptions.map(
						(option: { value: any; label: any }) => ({
							playlist_id: Number(playlistId),
							label_id: Number(option.value),
						})
					);

					replace(transformedArray);
				}}
				value={handleRenderValue()}
			/>
		</div>
	);
};

export default PlaylistPlayOn;
