function shouldForwardProp(
  props: PropertyKey[],
): (propName: PropertyKey) => boolean {
  return propName => {
    return !props.includes(propName);
  };
}

export { shouldForwardProp };
