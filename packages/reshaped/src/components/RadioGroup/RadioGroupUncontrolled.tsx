"use client";

import React from "react";
import RadioGroupControlled from "./RadioGroupControlled";
import type * as T from "./RadioGroup.types";

const RadioGroupUncontrolled = (props: T.UncontrolledProps) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue || null);

	const handleChange: T.Props["onChange"] = (args) => {
		if (!args.value) return;

		setValue(args.value);
		if (onChange) onChange(args);
	};

	return (
		<RadioGroupControlled
			{...props}
			value={value}
			defaultValue={undefined}
			onChange={handleChange}
		/>
	);
};

export default RadioGroupUncontrolled;
