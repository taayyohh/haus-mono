"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import View from "components/View";
import Icon from "components/Icon";
import Link from "components/Link";
import Text from "components/Text";
import Button from "components/Button";
import IconChevronRight from "icons/ChevronRight";
import IconDotsHorizontal from "icons/DotsHorizontal";
import * as T from "./Breadcrumbs.types";

const BreadcrumbsItem = (props: T.ItemProps) => {
	const { children, onClick, href, icon, disabled } = props;

	if (!href && !onClick && !disabled) {
		return (
			<Text variant="body-3" weight="medium" color="neutral">
				{children}
			</Text>
		);
	}

	return (
		<Link
			onClick={onClick}
			href={href}
			icon={icon}
			disabled={disabled}
			variant="plain"
			color="inherit"
		>
			{children}
		</Link>
	);
};

const Breadcrumbs = (props: T.Props) => {
	const { children, separator, color, defaultVisibleItems, ariaLabel, className, attributes } =
		props;
	const visibleItems = defaultVisibleItems && defaultVisibleItems >= 2 ? defaultVisibleItems : null;
	const [expanded, setExpanded] = React.useState(false);
	const rootClassNames = classNames(className);
	const childrenLength = React.Children.count(children);
	let renderIndex = 0;

	const handleExpand = () => {
		setExpanded(true);
	};

	return (
		<nav
			{...attributes}
			aria-label={ariaLabel || attributes?.["aria-label"]}
			className={rootClassNames}
		>
			<View as="ol" direction="row" gap={2} align="center">
				{React.Children.map(children, (child, index) => {
					if (!child) return null;

					const lastCollapsedIndex = childrenLength - (visibleItems || 0);
					const isBeforeCollapse = renderIndex === 0;
					const isAfterCollapse = renderIndex > lastCollapsedIndex;
					const isDisplayed = !visibleItems || isBeforeCollapse || isAfterCollapse || expanded;
					const isCollapseButton = renderIndex === lastCollapsedIndex;
					renderIndex += 1;

					let itemNode = null;

					if (isDisplayed) {
						itemNode = child;
					} else if (isCollapseButton) {
						itemNode = (
							<Button.Aligner>
								<Button
									variant="ghost"
									size="small"
									icon={IconDotsHorizontal}
									onClick={handleExpand}
								/>
							</Button.Aligner>
						);
					}

					if (itemNode === null) return null;

					return (
						<View as="li" key={index} gap={2} direction="row" align="center">
							{index > 0 && (isDisplayed || isCollapseButton) && (
								<Text color="neutral-faded">
									{separator || <Icon svg={IconChevronRight} size={3} />}
								</Text>
							)}
							<Text variant="body-3" color={color === "primary" ? "primary" : "neutral-faded"}>
								{itemNode}
							</Text>
						</View>
					);
				})}
			</View>
		</nav>
	);
};

Breadcrumbs.Item = BreadcrumbsItem;
export default Breadcrumbs;
