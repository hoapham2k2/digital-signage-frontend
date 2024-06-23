import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export const DigitalSignagePlayerDescription: React.FC = () => {
	const datas = [
		{
			id: 1,
			question: "What is a Digital Signage Player?",
			answer:
				"A digital signage player is a device that is connected to a screen and displays content. It can be a dedicated device or a computer.",
		},
		{
			id: 2,
			question: "Should I purchase a Digital Signage Player?",
			answer:
				"It depends on your needs. If you have the technical skills, you can build one yourself. Otherwise, you can purchase one.",
		},
		{
			id: 3,
			question: "What are the benefits of a Digital Signage Player?",
			answer:
				"A digital signage player allows you to display content on a screen. It can be used for advertising, information display, and more.",
		},
	];
	return (
		<Card className='flex-1'>
			{/* Header */}
			<CardHeader>
				<p>
					<strong>1. </strong>Purchase or self-build a Digital Signage Player
				</p>
				<img
					src='/screenly_player.png'
					alt='Screenly Player'
					className='object-contain  rounded-lg'
				/>
			</CardHeader>
			{/* Content */}
			<CardContent>
				<Accordion type='single' collapsible>
					{datas.map((data) => (
						<AccordionItem key={data.id} value={`item-${data.id}`}>
							<AccordionTrigger>{data.question}</AccordionTrigger>
							<AccordionContent>{data.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
};

export default DigitalSignagePlayerDescription;
