import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

type Props = NonNullable<unknown>;

const PreviewScreenSection = (_props: Props) => {
	const { pathname } = useLocation();

	return (
		<div className=' w-full h-full  lg:h-80 bg-slate-300 rounded-md flex flex-row items-center justify-center'>
			<Button
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
