import React from "react";
import Text from "components/Text";
import { classNames } from "utilities/helpers";
import type * as T from "./Hotkey.types";
import s from "./Hotkey.module.css";

const Hotkey = (props: T.Props) => {
	const { children, active, className, attributes } = props;
	const rootClassNames = classNames(s.root, active && s["--active"], className);

	return (
		<Text
			as="kbd"
			variant="caption-1"
			weight="medium"
			color="neutral-faded"
			className={rootClassNames}
			attributes={attributes}
		>
			{children}
		</Text>
	);
};

export default Hotkey;
