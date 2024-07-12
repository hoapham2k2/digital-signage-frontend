import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaLock } from "react-icons/fa";
import React from "react";
import ProfileSettingForm from "./ProfileSettingForm";
import PasswordSettingForm from "./PasswordSettingForm";

export const AccountSettingTabs: React.FC = () => {
	return (
		<Tabs defaultValue='account' className='flex flex-row gap-10 mt-4'>
			<TabsList className='w-2/5 h-full  flex flex-col shadow-md'>
				<TabsTrigger value='account' className='p-4 w-full flex flex-row gap-2'>
					<FaUser />
					<span>Profile settings</span>
				</TabsTrigger>
				<TabsTrigger
					value='password'
					className='p-4 w-full flex flex-row gap-2'>
					<FaLock />
					<span>Password</span>
				</TabsTrigger>
			</TabsList>
			<TabsContent value='account' className='w-full shadow-md rounded-md'>
				<div className='p-10 flex flex-col '>
					<ProfileSettingForm />
				</div>
			</TabsContent>
			<TabsContent value='password' className='w-full shadow-md rounded-md'>
				<div className='p-10 flex flex-col'>
					<PasswordSettingForm />
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default AccountSettingTabs;
