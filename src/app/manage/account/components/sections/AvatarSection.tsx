import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormContext } from "react-hook-form";
import { ProfileSettingFormProps } from "../ProfileSettingForm";

export const AvatarSection = () => {
	const methods = useFormContext<ProfileSettingFormProps>();
	return (
		<div className='w-full h-full flex flex-row items-center gap-2'>
			<Avatar className='w-36 h-36'>
				<AvatarImage
					src={methods.watch("user.avatar")}
					className='w-full h-full'
				/>
				<AvatarFallback className='text-2xl font-semibold'>
					{`${methods.watch("user.first_name")?.charAt(0)}${methods
						.watch("user.last_name")
						?.charAt(0)}`.toUpperCase() || "A"}
				</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default AvatarSection;
