import React from "react";
import RadioGroupControlled from "./RadioGroupControlled";
import RadioGroupUncontrolled from "./RadioGroupUncontrolled";
import type * as T from "./RadioGroup.types";

const RadioGroup = (props: T.Props) => {
	const { value } = props;

	if (value !== undefined) return <RadioGroupControlled {...(props as T.ControlledProps)} />;
	return <RadioGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default RadioGroup;
