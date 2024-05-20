import { Button } from "@/components/ui/button";
import { appStore } from "@/lib/stores/app-store";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const DeleteScreenButton = (props: Props) => {
	const { id } = useParams();
	const deleteScreen = appStore((state) => state.deleteScreen);

	const navigate = useNavigate();
	const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Add delete screen logic here
		deleteScreen(id as string);
		navigate("/manage/screens");
	};

	return (
		<Button variant='destructive' onClick={handleOnClick}>
			Delete Screen
		</Button>
	);
};

export default DeleteScreenButton;
