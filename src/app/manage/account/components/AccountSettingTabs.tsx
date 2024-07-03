import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export const AccountSettingTabs: React.FC = () => {
	const { user } = useAuth();
	return (
		<Tabs defaultValue='account' className='flex flex-row gap-2 mt-4'>
			<TabsList className='w-1/6 h-full  flex flex-col'>
				<TabsTrigger value='account'>Account</TabsTrigger>
				<TabsTrigger value='password'>Password</TabsTrigger>
			</TabsList>
			<TabsContent value='account' className='w-full'>
				<Card>
					<CardHeader />

					<CardContent className='space-y-10 space-x-4'>
						<div>
							<h1>Account Settings</h1>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value='password' className='w-full'>
				<Card>
					<CardHeader />

					<CardContent className='space-y-10 space-x-4'>
						<div>
							<h1>Password Settings</h1>
							<pre>{JSON.stringify(user, null, 2)}</pre>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default AccountSettingTabs;
