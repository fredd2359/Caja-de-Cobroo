/* SystemJS module definition */
declare var module: NodeModule;
declare var require: NodeRequire;
interface NodeModule {
  id: string;

}
interface NodeRequireFunction {
	(id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
	resolve(id: string): string;
	cache: any;
	extensions: any;
	main: NodeModule | undefined;
}

interface NodeModule {
	exports: any;
	require: NodeRequireFunction;
	id: string;
	filename: string;
	loaded: boolean;
	parent: NodeModule | null;
	children: NodeModule[];
}