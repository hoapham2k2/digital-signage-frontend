import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

type Props = NonNullable<unknown>;

const DashboardPage = (_props: Props) => {
	// write test data fetching to test cors
	// useEffect(() => {
	// 	fetch("http://localhost:5036/test", {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Access-Control-Allow-Origin": "*",
	// 		},
	// 	}).then((response) => response.json());
	// }, []);
	return (
		<div className='h-[3000px]'>
			<Button variant={"default"} size={"icon"} onClick={() => {}}>
				<ChevronRight className='h-4 w-4' />
			</Button>
		</div>
	);
};

export default DashboardPage;
