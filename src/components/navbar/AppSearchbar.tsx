import { Input } from "../ui/input";

type Props = {};

const AppSearchbar = (_props: Props) => {
	return <Input type='text' placeholder='Search...' className='lg:max-w-96' />;
};

export default AppSearchbar;
