import React from "react";
import useHotkeys from "hooks/useHotkeys";
import View from "components/View";

export default { title: "Hooks/useHotkeys" };

function Example() {
	const { checkHotkeyState } = useHotkeys({
		"shift + b + n": null,
	});
	const active = checkHotkeyState("shift + b + n");
	const shiftActive = checkHotkeyState("shift");
	const bActive = checkHotkeyState("b");
	const nActive = checkHotkeyState("n");

	return (
		<View
			animated
			gap={2}
			direction="row"
			backgroundColor={active ? "positive-faded" : undefined}
			padding={2}
			borderRadius="small"
		>
			<View
				paddingInline={4}
				paddingBlock={2}
				borderRadius="small"
				borderColor="neutral-faded"
				animated
				backgroundColor={shiftActive ? "neutral-faded" : "elevation-raised"}
				shadow={shiftActive ? undefined : "raised"}
			>
				Shift
			</View>
			<View
				paddingInline={4}
				paddingBlock={2}
				borderRadius="small"
				borderColor="neutral-faded"
				animated
				backgroundColor={bActive ? "neutral-faded" : "elevation-raised"}
				shadow={bActive ? undefined : "raised"}
			>
				b
			</View>
			<View
				paddingInline={4}
				paddingBlock={2}
				borderRadius="small"
				borderColor="neutral-faded"
				animated
				backgroundColor={nActive ? "neutral-faded" : "elevation-raised"}
				shadow={nActive ? undefined : "raised"}
			>
				n
			</View>
		</View>
	);
}

export const state = () => <Example />;
