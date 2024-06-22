import { Input } from "../ui/input";

type Props = NonNullable<unknown>;

const AppSearchbar = (_props: Props) => {
	return <Input type='text' placeholder='Search...' className='w-64' />;
};

export default AppSearchbar;
