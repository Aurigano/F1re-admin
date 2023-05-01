// @types.todo.ts
// export interface ITheme {
//     darkMode: boolean;
//   }
export type ThemeContextType = {
	// todos: ITheme[];
	darkMode?: boolean | undefined;
	handleDarkMode?: (darkMode?: boolean, setDarkMode?: () => void) => void;
};
