import React from "react";
import type * as G from "types/global";
import { FormControlProps } from "components/FormControl";
import { ActionableProps } from "components/Actionable";
import { IconProps } from "components/Icon";

type Size = G.Responsive<"medium" | "large" | "xlarge">;

type Option = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type ButtonTriggerProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	inputAttributes?: ActionableProps["attributes"];
	options?: never;
	onChange?: never;
};

export type SelectTriggerProps = {
	options: Option[];
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLSelectElement>>;
	inputAttributes?: G.Attributes<"select", Omit<Props, "id">>;
	onClick?: never;
	children?: never;
};

type BaseProps = ((ButtonTriggerProps | SelectTriggerProps) &
	Pick<FormControlProps, "hasError">) & {
	id?: string;
	name: string;
	size?: Size;
	variant?: "outline" | "faded" | "headless";
	disabled?: boolean;
	placeholder?: string;
	icon?: IconProps["svg"];
	startSlot?: React.ReactNode;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;
