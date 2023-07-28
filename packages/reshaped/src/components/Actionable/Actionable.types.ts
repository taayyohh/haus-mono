import type React from "react";
import type * as G from "types/global";

export type Props = {
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
	href?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	disabled?: boolean;
	fullWidth?: boolean;
	insetFocus?: boolean;
	borderRadius?: "inherit";
	as?: keyof JSX.IntrinsicElements;
	className?: G.ClassName;
	// Props are not ommited from attributes since we support all of them
	attributes?: Omit<G.Attributes<"button">, "ref"> &
		Omit<JSX.IntrinsicElements["a"], keyof G.Attributes<"button">> & {
			ref?: React.RefObject<HTMLButtonElement | HTMLAnchorElement>;
		};
};

export type Ref = React.Ref<HTMLButtonElement | HTMLAnchorElement>;
