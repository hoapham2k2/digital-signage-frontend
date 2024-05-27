import { deleteScreen } from "@/apis/screens";
import { Button } from "@/components/ui/button";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

type Props = {
	screenId: string;
};

const DeleteScreenButton = (_props: Props) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate } = useMutation(() => deleteScreen(_props.screenId), {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["screens"],
			});
			navigate("/manage/screens");
		},
	});

	return (
		<Button variant='destructive' onClick={() => mutate()}>
			Delete Screen
		</Button>
	);
};

export default DeleteScreenButton;
