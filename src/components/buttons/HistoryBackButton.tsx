import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = {};

const HistoryBackButton = (props: Props) => {
	const navigate = useNavigate();
	return (
		<Button size={"sm"} onClick={() => navigate(-1)}>
			<MdKeyboardArrowLeft className='w-5 h-6' />
		</Button>
	);
};

export default HistoryBackButton;
