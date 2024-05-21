import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = NonNullable<unknown>;

const HistoryBackButton = (_props: Props) => {
	const navigate = useNavigate();
	return (
		<Button size={"sm"} onClick={() => navigate(-1)}>
			<MdKeyboardArrowLeft className='w-5 h-6' />
		</Button>
	);
};

export default HistoryBackButton;
