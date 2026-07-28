export type User = {
  id: string;
  name: string;
  email: string;
}

export type IconSvgObject = ([string, {
    [key: string]: string | number;
}])[] | readonly (readonly [string, {
    readonly [key: string]: string | number;
}])[];