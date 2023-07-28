import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Loader.types";
import s from "./Loader.module.css";

const Loader = (props: T.Props) => {
	const { size = "small", color = "primary", className, attributes } = props;
	const ariaLabel = attributes?.["aria-label"] as React.AriaAttributes["aria-label"];
	const rootClassNames = classNames(
		s.root,
		className,
		responsiveClassNames(s, "--size", size),
		color && s[`--color-${color}`]
	);

	return (
		<span
			{...attributes}
			role="progressbar"
			aria-live={ariaLabel ? "assertive" : undefined}
			aria-label={ariaLabel}
			className={rootClassNames}
		>
			<span className={s.inner} />
		</span>
	);
};

export default Loader;
