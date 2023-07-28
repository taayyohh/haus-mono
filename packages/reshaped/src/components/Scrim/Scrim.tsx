import React from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./Scrim.types";
import s from "./Scrim.module.css";

const Scrim = (props: T.Props) => {
	const {
		children,
		backgroundSlot,
		position = "cover",
		attributes,
		className,
		scrimClassName,
	} = props;
	const rootClassNames = classNames(
		s.root,
		!!backgroundSlot && s["--with-background"],
		position && s[`--position-${position}`],
		className
	);
	const scrimClassNames = classNames(s.scrim, scrimClassName);

	return (
		<div {...attributes} className={rootClassNames}>
			{backgroundSlot}
			<div className={scrimClassNames}>
				<div className={s.content}>{children}</div>
			</div>
		</div>
	);
};

export default Scrim;
