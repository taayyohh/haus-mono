import React from "react";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import View, { ViewProps } from "components/View";

export default { title: "Hooks/useResponsiveClientValue" };

function Example() {
	const value = useResponsiveClientValue<ViewProps["backgroundColor"]>({
		s: "neutral",
		m: "critical",
		l: "positive",
	});

	return <View width={25} height={25} backgroundColor={value} />;
}

export const state = () => <Example />;
