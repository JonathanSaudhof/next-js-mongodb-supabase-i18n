type NestedStringObject = {
  [key: string]: string | NestedStringObject;
};
/**
 * registerRoutes function to register routes
 * @param routesConfig
 * @returns
 */
export function registerRoutes<T extends NestedStringObject>(routesConfig: T) {
  let routes = {} as T;
  Object.assign(routes, routesConfig);

  return (selector: ObjectKeys<T>, locale: string) =>
    getRouteWithLocaleFactory(selector, locale, routes);
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// using
type ObjectKeys<T extends NestedStringObject> = NestedKeyOf<T>;

function getRouteWithLocaleFactory<T extends NestedStringObject>(
  selector: ObjectKeys<T>,
  locale: string,
  routes: NestedStringObject
): string {
  const path = selector
    .split(".")
    .reduce((o, i) => (o as any)[i], routes) as unknown as string;

  const pathWithLocale = trimDoubleSlashes(`/${locale}${path}`);

  return trimDoubleSlashes(`/${locale}${path}`);
}

function trimDoubleSlashes(path: string) {
  return "/" + path.split("/").filter(Boolean).join("/");
}
