export type BetterOmit<Type, Prop> = {
  [Property in keyof Type as Exclude<Property, Prop>]: Type[Property];
};
