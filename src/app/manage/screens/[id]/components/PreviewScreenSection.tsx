import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

type Props = {};

const PreviewScreenSection = (_props: Props) => {
	const { pathname } = useLocation();

	return (
		<div className='relative w-full lg:h-80 bg-slate-300'>
			<Button
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				onClick={() => {
					// open new tab
					window.open(`${pathname}/preview`);
				}}>
				Preview
			</Button>
		</div>
	);
};

export default PreviewScreenSection;
