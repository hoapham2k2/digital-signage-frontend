import { deleteScreen } from "@/apis/screens";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

type Props = {
	screenId: string;
};

const DeleteScreenButton = (_props: Props) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { mutate } = useMutation(() => deleteScreen(_props.screenId), {
		onSuccess: () => {
			toast({
				title: "Screen Deleted",
				description: "Screen deleted successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["screens"],
			});
			navigate("/manage/screens");
		},
		onError: (error: Error) => {
			toast({
				title: "Error while deleting screen",
				description: error.message,
			});
		},
	});

	return (
		<Button variant='destructive' onClick={() => mutate()}>
			Delete Screen
		</Button>
	);
};

export default DeleteScreenButton;
