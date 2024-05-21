import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type Props = NonNullable<unknown>;

const DashboardPage = (_props: Props) => {
	return (
		<div className='h-[3000px]'>
			<Button variant={"default"} size={"icon"} onClick={() => {}}>
				<ChevronRight className='h-4 w-4' />
			</Button>
		</div>
	);
};

export default DashboardPage;
