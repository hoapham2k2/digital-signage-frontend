import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdKeyboardArrowLeft } from "react-icons/md";


const HistoryBackButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			size={"sm"}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				navigate(-1);
			}}>
			<MdKeyboardArrowLeft className='w-5 h-6' />
		</Button>
	);
};

export default HistoryBackButton;
