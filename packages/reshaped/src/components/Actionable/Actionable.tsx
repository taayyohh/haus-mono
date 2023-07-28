"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./Actionable.types";
import s from "./Actionable.module.css";

const Actionable = (props: T.Props, ref: T.Ref) => {
	const {
		children,
		href,
		onClick,
		type,
		disabled,
		insetFocus,
		borderRadius,
		as,
		fullWidth,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		disabled && s["--disabled"],
		borderRadius && s[`--radius-${borderRadius}`],
		insetFocus && s["--inset"],
		fullWidth && s["--full-width"]
	);
	const rootAttributes: T.Props["attributes"] = { ...attributes };
	const hasClickHandler = onClick || (attributes?.onClick as T.Props["onClick"]);
	const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
	const isLink = Boolean(href || attributes?.href);
	const isButton = Boolean(hasClickHandler || hasFocusHandler || type);
	let TagName: any;

	if (isLink) {
		rootAttributes.href = disabled ? undefined : href || attributes?.href;
		TagName = "a";
	} else if (isButton && (!as || as === "button")) {
		TagName = "button";
		rootAttributes.type = type || attributes?.type || "button";
		rootAttributes.disabled = disabled || attributes?.disabled;
	} else if (isButton) {
		const isFocusable = as === "label";
		const simulateButton = !isFocusable || hasClickHandler || hasFocusHandler;

		TagName = as || "span";
		rootAttributes.role = simulateButton ? "button" : undefined;
		rootAttributes.tabIndex = simulateButton ? 0 : undefined;
	} else {
		TagName = as || "span";
	}

	const handlePress: T.Props["onClick"] = (event) => {
		if (disabled) return;

		onClick?.(event);
		attributes?.onClick?.(event as any);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => handlePress(event);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		const simulatingButton = rootAttributes.role === "button";

		if (!simulatingButton || isLink) return;
		const isSpace = event.key === " ";
		const isEnter = event.key === "Enter";
		if (!isSpace && !isEnter) return;

		event.preventDefault();
		handlePress(event);
	};

	return (
		<TagName
			ref={ref}
			// rootAttributes can receive ref from Flyout
			{...rootAttributes}
			className={rootClassNames}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</TagName>
	);
};

export default React.forwardRef(Actionable);
