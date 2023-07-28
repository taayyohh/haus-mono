import React from "react";
import { Placeholder, Example } from "utilities/storybook";
import View, { ViewProps } from "components/View";
import Hidden from "components/Hidden";
import Text from "components/Text";
import Tabs from "components/Tabs";
import Avatar from "components/Avatar";
import MenuItem from "components/MenuItem";
import Button from "components/Button";

export default { title: "Utilities/View" };

export const padding = () => (
	<Example title="Border is used to highlight the padding value">
		<Example.Item title="padding: 4">
			<View padding={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="padding: 6">
			<View padding={6} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="padding: 0">
			<View padding={0} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="padding: vertical 2, horizontal 4">
			<View paddingInline={4} paddingBlock={2} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="paddingTop: 4">
			<View paddingTop={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="paddingBottom: 4">
			<View paddingBottom={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="paddingStart: 4">
			<View paddingStart={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="paddingEnd: 4">
			<View paddingEnd={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"responsive padding:",
				"[s] vertical 2, horizontal 4",
				"[m+] vertical 4, horizontal 8",
			]}
		>
			<View paddingInline={{ s: 4, m: 8 }} paddingBlock={{ s: 2, m: 4 }} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item
			title={["responsive padding:", "[s] top 2, bottom 4", "[m+] top 4, bottom 0, start: 8"]}
		>
			<View
				paddingTop={{ s: 2, m: 4 }}
				paddingBottom={{ s: 4, m: 0 }}
				paddingStart={{ s: 0, m: 8 }}
				borderColor="neutral"
			>
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="nested padding, child view should have no horizontal padding">
			<View paddingStart={4} borderColor="neutral">
				<View borderColor="primary" paddingBlock={4}>
					<Placeholder />
				</View>
			</View>
		</Example.Item>
	</Example>
);

export const direction = () => (
	<Example title="Item 1 is another component, Item 2 is View.Item, Item 3 is text">
		<Example.Item title="direction: column as default">
			<View gap={3}>
				<Placeholder>Item 1</Placeholder>
				<View.Item>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				Text item 3
			</View>
		</Example.Item>
		<Example.Item title="direction: column">
			<View gap={3} direction="column">
				<Placeholder>Item 1</Placeholder>
				<View.Item>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				Text item 3
			</View>
		</Example.Item>
		<Example.Item title="direction: column-reverse">
			<View gap={3} direction="column-reverse">
				<Placeholder>Item 1</Placeholder>
				<View.Item>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				Text item 3
			</View>
		</Example.Item>
		<Example.Item title="direction: row">
			<View gap={3} direction="row">
				<Placeholder>Item 1</Placeholder>
				<View.Item>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				Text item 3
			</View>
		</Example.Item>
		<Example.Item title="direction: row-reverse">
			<View gap={3} direction="row-reverse">
				<Placeholder>Item 1</Placeholder>
				<View.Item>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				Text item 3
			</View>
		</Example.Item>
		<Example.Item
			title={["responsive direction", "[s] column-reverse", "[m] row-reverse", "[l+] row"]}
		>
			<View direction={{ s: "column-reverse", m: "row-reverse", l: "row" }} gap={3}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
	</Example>
);

export const gap = () => (
	<Example>
		<Example.Item title="gap: 4, direction: row">
			<View direction="row" gap={4}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title="gap: 0, direction: row">
			<View direction="row" gap={0}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title={["responsive gap, direction: row", "[s] 4", "[m+] 8"]}>
			<View direction="row" gap={{ s: 4, m: 8 }}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title="gap: 4, direction: column">
			<View gap={4}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title="gap: 0, direction: column">
			<View gap={0}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title={["responsive gap, direction: column", "[s] 4", "[m+] 8"]}>
			<View gap={{ s: 4, m: 8 }}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
	</Example>
);

export const divided = () => (
	<Example>
		<Example.Item title="direction: row">
			<View divided direction="row" gap={3}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title="direction: column">
			<View divided gap={3}>
				<Placeholder>Item 1</Placeholder>
				<Placeholder>Item 2</Placeholder>
			</View>
		</Example.Item>
		<Example.Item title={["responsive divided", "[s] direction: row", "[m+] direction: column"]}>
			<View divided direction={{ s: "row", m: "column" }} gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="direction: row, columns">
			<View divided gap={3} direction="row">
				<View.Item columns={2}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={8}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={2}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const bleed = () => (
	<Example title="Removes side borders and border radius when applied">
		<Example.Item title="bleed: 4">
			<View bleed={4} padding={4} borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title={["responsive bleed", "[s] 4", "[m+] 0"]}>
			<View bleed={{ s: 4, m: 0 }} padding={4} borderRadius="small" borderColor="neutral">
				<Placeholder />
			</View>
		</Example.Item>
	</Example>
);

export const wrap = () => (
	<Example>
		<Example.Item title="wrap: false">
			<View direction="row" wrap={false} gap={3}>
				<Placeholder w={600} h={100} />
				<Placeholder w={600} h={100} />
			</View>
		</Example.Item>
	</Example>
);

export const align = () => (
	<Example>
		<Example.Item title="align: start, direction: row">
			<View align="start" direction="row" gap={3}>
				<Placeholder />
				<Placeholder h={100} />
			</View>
		</Example.Item>
		<Example.Item title="align: center, direction: row">
			<View align="center" direction="row" gap={3}>
				<Placeholder />
				<Placeholder h={100} />
			</View>
		</Example.Item>
		<Example.Item title="align: end, direction: row">
			<View align="end" direction="row" gap={3}>
				<Placeholder />
				<Placeholder h={100} />
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"align: stretch, direction: row",
				"2nd item is stretched based on the 1st item height",
			]}
		>
			<View align="stretch" direction="row" gap={3}>
				<Placeholder h={100} />
				<Placeholder h="auto" />
			</View>
		</Example.Item>
		<Example.Item title="align: baseline, direction: row">
			<View align="baseline" direction="row" gap={3}>
				<Placeholder />
				<Text variant="title-6">Content</Text>
			</View>
		</Example.Item>

		<Example.Item title="align: start, direction: column">
			<View align="start" direction="column" gap={3}>
				<Placeholder />
				<Placeholder w={100} />
			</View>
		</Example.Item>
		<Example.Item title="align: center, direction: column">
			<View align="center" direction="column" gap={3}>
				<Placeholder />
				<Placeholder w={100} />
			</View>
		</Example.Item>
		<Example.Item title="align: end, direction: row">
			<View align="end" direction="column" gap={3}>
				<Placeholder />
				<Placeholder w={100} />
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"align: stretch, direction: column",
				"1st item uses its own width, 2nd item is stretched to full width",
			]}
		>
			<View align="stretch" direction="column" gap={3}>
				<Placeholder w={100} />
				<Placeholder w="auto" />
			</View>
		</Example.Item>
	</Example>
);

export const justify = () => (
	<Example>
		<Example.Item title="justify: start, direction: row">
			<View justify="start" direction="row" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="justify: center, direction: row">
			<View justify="center" direction="row" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="justify: end, direction: row">
			<View justify="end" direction="row" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>

		<Example.Item title="justify: start, direction: column, height: 200px">
			<View height="200px" justify="start" direction="column" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="justify: center, direction: column, height: 200px">
			<View height="200px" justify="center" direction="column" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
		<Example.Item title="justify: end, direction: column, height: 200px">
			<View justify="end" height="200px" direction="column" gap={3}>
				<Placeholder />
				<Placeholder />
			</View>
		</Example.Item>
	</Example>
);

export const textAlign = () => (
	<Example>
		<Example.Item title="textAlign: start">
			<View textAlign="start">Content</View>
		</Example.Item>

		<Example.Item title="textAlign: center">
			<View textAlign="center">Content</View>
		</Example.Item>

		<Example.Item title="textAlign: end">
			<View textAlign="end">Content</View>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="height: 100px, width: 100px">
			<View backgroundColor="neutral-faded" height="100px" width="100px" />
		</Example.Item>
		<Example.Item title="height: 25, width: 25">
			<View backgroundColor="neutral-faded" height={25} width={25} />
		</Example.Item>
		<Example.Item
			title={[
				"responsive height and width",
				"[s] height: 25, width: 25",
				"[m+] height: 200px, width: 200px",
			]}
		>
			<View
				backgroundColor="neutral-faded"
				height={{ s: 25, m: "200px" }}
				width={{ s: 25, m: "200px" }}
			/>
		</Example.Item>
	</Example>
);

export const ratio = () => (
	<Example>
		<Example.Item title="ratio: 16 / 9">
			<View backgroundColor="neutral-faded" aspectRatio={16 / 9} width="200px" />
		</Example.Item>
		<Example.Item title={["responsive ratio", "[s] 1/1", "[m+] 16/9"]}>
			<View backgroundColor="neutral-faded" aspectRatio={{ s: 1, m: 16 / 9 }} width="200px" />
		</Example.Item>
	</Example>
);

export const maxSize = () => (
	<Example>
		<Example.Item title="maxHeight: 150px, maxWidth: 150px, height: 300px">
			<View backgroundColor="neutral-faded" maxHeight="150px" maxWidth="150px" height="300px" />
		</Example.Item>
		<Example.Item title="maxHeight: 25, maxWidth: 25, height: 50">
			<View backgroundColor="neutral-faded" maxHeight={25} maxWidth={25} height={50} />
		</Example.Item>
		<Example.Item
			title={[
				"responsive maxHeight and maxWidth, height: 300",
				"[s] maxHeight: 25, maxWidth: 25",
				"[m+] maxHeight: 200px, maxWidth: 200px",
			]}
		>
			<View
				backgroundColor="neutral-faded"
				maxHeight={{ s: 25, m: "200px" }}
				maxWidth={{ s: 25, m: "200px" }}
				height="300px"
			/>
		</Example.Item>
	</Example>
);

export const background = () => (
	<Example title="border is used to highlight the backround value when it's similar to the page background, text color changes based on the background">
		<Example.Item title="bg: page">
			<View backgroundColor="page" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: page-faded">
			<View backgroundColor="page-faded" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: disabled">
			<View backgroundColor="disabled" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: disabled-faded">
			<View backgroundColor="disabled-faded" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: elevation-base">
			<View backgroundColor="elevation-base" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: elevation-raised">
			<View backgroundColor="elevation-raised" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: elevation-overlay">
			<View backgroundColor="elevation-overlay" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: neutral">
			<View backgroundColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: neutral-faded">
			<View backgroundColor="neutral-faded" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: primary">
			<View backgroundColor="primary" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: primary-faded">
			<View backgroundColor="primary-faded" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: critical">
			<View backgroundColor="critical" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: critical-faded">
			<View backgroundColor="critical-faded" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: positive">
			<View backgroundColor="positive" padding={4}>
				Content
			</View>
		</Example.Item>
		<Example.Item title="bg: positive-faded">
			<View backgroundColor="positive-faded" padding={4}>
				Content
			</View>
		</Example.Item>
	</Example>
);

export const border = () => (
	<Example>
		<Example.Item title="border: neutral">
			<View borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: neutral-faded">
			<View borderColor="neutral-faded" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: primary">
			<View borderColor="primary" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: primary-faded">
			<View borderColor="primary-faded" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: critical">
			<View borderColor="critical" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: critical-faded">
			<View borderColor="critical-faded" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: positive">
			<View borderColor="positive" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: positive-faded">
			<View borderColor="positive" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="border: transparent, background: primary-faded">
			<View borderColor="transparent" backgroundColor="primary-faded" padding={4}>
				Content
			</View>
		</Example.Item>
	</Example>
);

export const radius = () => (
	<Example>
		<Example.Item title="radius: small">
			<View borderRadius="small" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="radius: medium">
			<View borderRadius="medium" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="radius: large">
			<View borderRadius="large" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>

		<Example.Item title="radius: circular">
			<View borderRadius="circular" borderColor="neutral" padding={4}>
				Content
			</View>
		</Example.Item>
	</Example>
);

export const shadow = () => (
	<Example>
		<Example.Item title="shadow: raised, radius: medium">
			<View
				height="100px"
				width="100px"
				shadow="raised"
				borderRadius="medium"
				backgroundColor="elevation-raised"
			/>
		</Example.Item>
		<Example.Item title="shadow: overlay, radius: medium">
			<View
				height="100px"
				width="100px"
				shadow="overlay"
				borderRadius="medium"
				backgroundColor="elevation-overlay"
			/>
		</Example.Item>
	</Example>
);

export const overflow = () => (
	<Example>
		<Example.Item
			title={["overflow: hidden, radius: medium", "child background should have radius"]}
		>
			<View height="100px" width="100px" shadow="raised" borderRadius="medium" overflow="hidden">
				<View backgroundColor="primary" height="100%" width="100%" />
			</View>
		</Example.Item>
	</Example>
);

export const position = () => (
	<Example>
		<Example.Item title="position: relative + absolute">
			<View borderColor="neutral" position="relative">
				<Placeholder />
				<View position="absolute" insetTop={0} insetEnd={0} backgroundColor="critical" zIndex={5}>
					top
				</View>
				<View position="absolute" insetTop={0} insetEnd={0} backgroundColor="primary">
					below
				</View>
			</View>
		</Example.Item>

		<Example.Item title="position: sticky">
			<div style={{ overflow: "auto", height: 100 }}>
				<View position="sticky" borderColor="primary" insetTop={0}>
					Content
				</View>
				<Placeholder h={1000} />
			</div>
		</Example.Item>

		<Example.Item title={["responsive", "[s] position: absolute", "[m+]: position: relative"]}>
			<div style={{ overflow: "auto", height: 100, position: "relative" }}>
				<View position={{ s: "absolute", m: "relative" }} borderColor="primary" insetTop={0}>
					Content
				</View>
				<Placeholder h={1000} />
			</div>
		</Example.Item>
	</Example>
);

export const inset = () => (
	<Example>
		<Example.Item title="inset: 4">
			<View backgroundColor="neutral-faded" width={25} height={25}>
				<View backgroundColor="neutral" position="absolute" inset={4} />
			</View>
		</Example.Item>

		<Example.Item title="insetTop: 4">
			<View backgroundColor="neutral-faded" width={25} height={25}>
				<View backgroundColor="neutral" position="absolute" insetTop={4} height={10} width={10} />
			</View>
		</Example.Item>

		<Example.Item title="insetStart: 4">
			<View backgroundColor="neutral-faded" width={25} height={25}>
				<View backgroundColor="neutral" position="absolute" insetStart={4} height={10} width={10} />
			</View>
		</Example.Item>

		<Example.Item title="insetEnd: 4">
			<View backgroundColor="neutral-faded" width={25} height={25}>
				<View backgroundColor="neutral" position="absolute" insetEnd={4} height={10} width={10} />
			</View>
		</Example.Item>

		<Example.Item title="insetBottom: 4">
			<View backgroundColor="neutral-faded" width={25} height={25}>
				<View
					backgroundColor="neutral"
					position="absolute"
					insetBottom={4}
					height={10}
					width={10}
				/>
			</View>
		</Example.Item>
	</Example>
);

const Animated = () => {
	const [background, setBackground] = React.useState<ViewProps["backgroundColor"]>("neutral");

	return (
		<View gap={3} align="start">
			<Button onClick={() => setBackground((prev) => (prev === "neutral" ? "primary" : "neutral"))}>
				Change background
			</Button>
			<View
				height="100px"
				width="100px"
				backgroundColor={background}
				align="center"
				justify="center"
				animated
			>
				Content
			</View>
		</View>
	);
};
export const animated = () => <Animated />;

export const itemGapBefore = () => (
	<Example>
		<Example.Item title={["gap: 4, 3rd item gapBefore: 10, direction: row", "increased gap"]}>
			<View direction="row" gap={4}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={10}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title={["gap: 10, 3rd item gapBefore: 4, direction: row", "reduced gap"]}>
			<View direction="row" gap={10}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={4}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title={["gap: 10, 3rd item gapBefore: 0, direction: row", "removed gap"]}>
			<View direction="row" gap={10}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={0}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="gap: 4, direction: row, 2nd item gap: auto">
			<View direction="row" gap={4}>
				<Placeholder w={200} />
				<View.Item gapBefore="auto">
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title={["gap: 4, 3rd item gapBefore: 10, direction: column", "increased gap"]}>
			<View direction="column" gap={4}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={10}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title={["gap: 10, 3rd item gapBefore: 4, direction: column", "reduced gap"]}>
			<View direction="column" gap={10}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={4}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title={["gap: 10, 3rd item gapBefore: 0, direction: column", "removed gap"]}>
			<View direction="column" gap={10}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={0}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="gap: 4, direction: column, height: 200px, 2nd item gap: auto">
			<View height="200px" gap={4}>
				<Placeholder />
				<View.Item gapBefore="auto">
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item
			title={[
				"responsive item gap",
				"gap: 4, direction: row",
				"[s] 3rd item gapBefore: 10",
				"[m+] 3rd item gapBefore: 0",
			]}
		>
			<View direction="row" gap={4}>
				<Placeholder />
				<Placeholder />
				<View.Item gapBefore={{ s: 10, m: 0 }}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const itemGrow = () => (
	<Example>
		<Example.Item title="direction: row, 2nd item grow">
			<View direction="row" gap={3}>
				<Placeholder w={200} />
				<View.Item grow>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title="direction: column, height: 200px, 2nd item grow">
			<View direction="column" gap={3} height="200px">
				<Placeholder />
				<View.Item grow>
					<Placeholder h="100%" />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title="direction: row, 2nd item grow, applied to View">
			<View direction="row" gap={3}>
				<Placeholder w={200} />
				<View grow>
					<Placeholder />
				</View>
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"responsive item grow, direction: row",
				"[s] 2nd item grow",
				"[m+] 2nd item doesn't grow",
			]}
		>
			<View direction="row" gap={3}>
				<Placeholder w={200} />
				<View.Item grow={{ s: true, m: false }}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"responsive item grow, direction: column, height: 200px",
				"[s] 2nd item grow",
				"[m+] 2nd item doesn't grow",
			]}
		>
			<View direction="column" gap={3} height="200px">
				<Placeholder />
				<View.Item grow={{ s: true, m: false }}>
					<Placeholder h="100%" />
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const itemColumns = () => (
	<Example>
		<Example.Item title="columns 6, 6, gap: 0">
			<View direction="row">
				<View.Item columns={6}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={6}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="columns 6, 6, gap: 4">
			<View direction="row" gap={4}>
				<View.Item columns={6}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={6}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="columns 3, 9, gap: 4">
			<View direction="row" gap={4}>
				<View.Item columns={3}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={9}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="columns 6, 6, 9, gap: 4">
			<View direction="row" gap={4}>
				<View.Item columns={6}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={6}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={9}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title={["responsive columns", "[s] columns 6, 6, 12, gap: 4", "[m+]: 4, 4, 4"]}>
			<View direction="row" gap={4}>
				<View.Item columns={{ s: 6, m: 4 }}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={{ s: 6, m: 4 }}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={{ s: 12, m: 4 }}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item title="columns 6, 6, 9, gap: 4, 2nd item gapBefore: 20">
			<View direction="row" gap={4}>
				<View.Item columns={6}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={6} gapBefore={20}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={9}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const itemOrder = () => (
	<Example>
		<Example.Item title="order: 1 3 2">
			<View direction="row" gap={4}>
				<View.Item columns={4}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={4} order={1}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={4}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title={["responsive order", "[s] 1 2 3", "[m+] 1 3 2"]}>
			<View direction="row" gap={4}>
				<View.Item columns={4}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item columns={4} order={{ s: 0, m: 1 }}>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={4}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"responsive order",
				"[s]: 1 3 2, 2 is full width on second row",
				"[m+]: 1 2 3, 2 has grow in the center of the first row",
			]}
		>
			<View direction="row" gap={3}>
				<View.Item columns={{ s: 6, m: "auto" }}>
					<Placeholder>Item 1</Placeholder>
				</View.Item>
				<View.Item
					grow={{ s: false, m: true }}
					order={{ s: 1, m: 0 }}
					columns={{ s: 12, m: "auto" }}
				>
					<Placeholder>Item 2</Placeholder>
				</View.Item>
				<View.Item columns={{ s: 6, m: "auto" }}>
					<Placeholder>Item 3</Placeholder>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const testHiddenItem = () => (
	<Example>
		<Example.Item
			title={[
				"[s] 2nd item: visible, grow, 3rd item: !grow",
				"[m+] 2nd item: hidden, 2nd item divider: hidden, 3rd item: grow",
			]}
		>
			<View direction="row" divided gap={3}>
				<Placeholder />
				<Hidden hide={{ s: false, m: true }}>
					<View.Item grow key="3">
						<Placeholder />
					</View.Item>
				</Hidden>
				<View.Item grow={{ s: false, m: true }}>
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>

		<Example.Item
			title={[
				"[s] 2nd item: visible, grow, 3rd item: !grow",
				"[m+] 2nd item: hidden, 2nd item: grow doesn't push 3rd item, 3rd item: grow",
			]}
		>
			<View direction="row" gap={3}>
				<Placeholder key="1" />
				<Hidden hide={{ s: false, m: true }} key="hidden">
					{(className) => (
						<View.Item grow className={className} key="hidden">
							<Placeholder />
						</View.Item>
					)}
				</Hidden>
				<View.Item grow={{ s: false, m: true }} key="3">
					<Placeholder />
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const testNestedGaps = () => (
	<Example>
		<Example.Item
			title={[
				"direction: column, gap: 10",
				"Child 1: direction: column, gap: 2",
				"Child 2: direction column, gap: 6",
				"Child 3: gapBefore: 0",
				"Child 3 view: direction: row, gap: 2",
			]}
		>
			<View gap={10}>
				<View gap={2}>
					<Placeholder>Child 1</Placeholder>
					<Placeholder>Child 1</Placeholder>
				</View>

				<View gap={6}>
					<Placeholder>Child 2</Placeholder>
					<Placeholder>Child 2</Placeholder>
				</View>

				<View.Item gapBefore={0}>
					<View direction="row" gap={2}>
						<Placeholder>Child 3, very long text</Placeholder>
						<Placeholder>Child 3, very long text</Placeholder>
						<Placeholder>Child 3, very long text</Placeholder>
						<Placeholder>Child 3, very long text</Placeholder>
						<Placeholder>Child 3, very long text</Placeholder>
						<Placeholder>Child 3, very long text</Placeholder>
					</View>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const testComposition = () => (
	<Example>
		<Example.Item
			title={[
				"View.Item, MenuItem, Aspect ratio",
				"ratio should increase height on viewport change",
			]}
		>
			<View direction="row" gap={3}>
				<View.Item>
					<Placeholder />
				</View.Item>
				<MenuItem selected roundedCorners>
					Menu
				</MenuItem>
				<View.Item grow>
					<View aspectRatio={16 / 9}>
						<Placeholder h="100%" />
					</View>
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item title="Scrollable tabs inside View.Item with grow">
			<View gap={3}>
				<Placeholder />
				<View direction="row" align="center" gap={3}>
					<Placeholder />
					<View.Item grow>
						<View padding={0} align="center">
							<Tabs variant="pills">
								<Tabs.List>
									<Tabs.Item value="1">Very long item</Tabs.Item>
									<Tabs.Item value="2">Very long item</Tabs.Item>
									<Tabs.Item value="3">Very long item</Tabs.Item>
									<Tabs.Item value="4">Very long item</Tabs.Item>
									<Tabs.Item value="5">Very long item</Tabs.Item>
									<Tabs.Item value="6">Very long item</Tabs.Item>
								</Tabs.List>
							</Tabs>
						</View>
					</View.Item>
					<Placeholder />
				</View>
			</View>
		</Example.Item>
		<Example.Item title="2nd item has grow, Avatar stays circle">
			<View direction="row" gap={3}>
				<Avatar initials="DB" />
				<View.Item grow>
					Veggies sunt bona vobis, proinde vos postulo esse magis grape pea sprouts horseradish
					courgette maize spinach prairie turnip jícama coriander quandong gourd broccoli seakale
					gumbo. Parsley corn lentil zucchini radicchio maize burdock avocado sea lettuce. Garbanzo
					tigernut earthnut pea fennel.
				</View.Item>
			</View>
		</Example.Item>
		<Example.Item
			title={[
				"item gapBefore from parent doesn't affect the child view",
				"columns should take full width",
			]}
		>
			<View>
				<View.Item gapBefore={20}>
					<View direction="row" gap={4}>
						<View.Item columns={6}>
							<Placeholder />
						</View.Item>
						<View.Item columns={6}>
							<Placeholder />
						</View.Item>
					</View>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);
