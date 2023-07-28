import type * as G from "types/global";

export type Props = {
	value?: number;
	max?: number;
	min?: number;
	size?: "small" | "medium";
	color?: "primary" | "critical" | "positive" | "white";
	duration?: number;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
