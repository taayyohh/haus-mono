import type * as T from "./easing.types";
import { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "easing",
		type: "variable",
		value: `cubic-bezier(${token.x1}, ${token.y1}, ${token.x2}, ${token.y2})`,
	},
];

export default transformedToken;
