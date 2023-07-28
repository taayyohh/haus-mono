export type Name =
	| "foregroundNeutral"
	| "foregroundNeutralFaded"
	| "foregroundDisabled"
	| "foregroundPrimary"
	| "foregroundCritical"
	| "foregroundPositive"
	| "borderNeutral"
	| "borderNeutralFaded"
	| "borderDisabled"
	| "borderPrimary"
	| "borderPrimaryFaded"
	| "borderCritical"
	| "borderCriticalFaded"
	| "borderPositive"
	| "borderPositiveFaded"
	| "backgroundNeutral"
	| "backgroundNeutralFaded"
	| "backgroundNeutralHighlighted"
	| "backgroundDisabled"
	| "backgroundDisabledFaded"
	| "backgroundPrimary"
	| "backgroundPrimaryFaded"
	| "backgroundPrimaryHighlighted"
	| "backgroundCritical"
	| "backgroundCriticalFaded"
	| "backgroundCriticalHighlighted"
	| "backgroundPositive"
	| "backgroundPositiveFaded"
	| "backgroundPositiveHighlighted"
	| "backgroundPage"
	| "backgroundPageFaded"
	| "backgroundElevationBase"
	| "backgroundElevationRaised"
	| "backgroundElevationOverlay"
	| "white"
	| "black";

export type GeneratedOnName =
	| "onBackgroundNeutral"
	| "onBackgroundPrimary"
	| "onBackgroundPositive"
	| "onBackgroundCritical";

export type GeneratedRGBName =
	| "rgbBackgroundNeutral"
	| "rgbBackgroundNeutralFaded"
	| "rgbBackgroundNeutralHighlighted"
	| "rgbBackgroundDisabled"
	| "rgbBackgroundDisabledFaded"
	| "rgbBackgroundPrimary"
	| "rgbBackgroundPrimaryFaded"
	| "rgbBackgroundPrimaryHighlighted"
	| "rgbBackgroundCritical"
	| "rgbBackgroundCriticalFaded"
	| "rgbBackgroundCriticalHighlighted"
	| "rgbBackgroundPositive"
	| "rgbBackgroundPositiveFaded"
	| "rgbBackgroundPositiveHighlighted"
	| "rgbBackgroundPage"
	| "rgbBackgroundPageFaded"
	| "rgbBackgroundElevationBase"
	| "rgbBackgroundElevationRaised"
	| "rgbBackgroundElevationOverlay";

export type Token = { hex: string; hexDark?: string };
