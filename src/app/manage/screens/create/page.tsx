import HistoryBackButton from "@/components/buttons/HistoryBackButton";
import AddScreenInstruction from "./components/AddScreenInstruction";
import DigitalSignagePlayerDescription from "./components/DigitalSignagePlayerDescription";

export const NewScreenPage: React.FC = () => {
	return (
		<div>
			{/* Page Header */}
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-2 items-center'>
					<HistoryBackButton />
					<h1 className='text-2xl'>How to add a screen</h1>
				</div>
			</div>
			{/* Page Content */}
			<div className='mt-2 flex flex-row gap-2'>
				<DigitalSignagePlayerDescription />
				<AddScreenInstruction />
			</div>
		</div>
	);
};

export default NewScreenPage;
