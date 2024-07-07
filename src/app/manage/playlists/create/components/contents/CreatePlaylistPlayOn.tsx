import React from "react";
import Select from "react-select";
const CreatePlaylistPlayOn = () => {
	const options = [
		{ value: "all", label: "All" },
		{ value: "specific", label: "Specific" },
	];
	return <Select options={options} />;
};

export default CreatePlaylistPlayOn;
