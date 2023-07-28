import React from "react";
import type * as G from "types/global";

export type Context = {
	id: string;
	titleMounted: boolean;
	setTitleMounted: (b: boolean) => void;
	subtitleMounted: boolean;
	setSubtitleMounted: (b: boolean) => void;
};

export type TitleProps = {
	children: React.ReactNode;
};

export type SubtitleProps = {
	children: React.ReactNode;
};

export type Props = {
	children?: React.ReactNode;
	position?: G.Responsive<"center" | "end" | "bottom" | "start">;
	size?: G.Responsive<string>;
	padding?: G.Responsive<number>;
	active?: boolean;
	transparentOverlay?: boolean;
	onClose?: () => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
