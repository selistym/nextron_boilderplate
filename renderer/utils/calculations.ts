/**
 * Gives left position of modal depending on where we want to place it. Avoid collisions is
 * in regards to make sure the element never hits the end of the screen.
 */
export const leftPosWithinView = (
  parentSize,
  childSize,
  avoidCollisions: boolean,
  offsetLeft: number | undefined,
) => {
  if (avoidCollisions) {
    return Math.max(
      Math.min(parentSize.left + (offsetLeft || 0), window.innerWidth - childSize.width),
      0,
    );
  }

  return parentSize.left + (offsetLeft || 0);
};

/**
 * Find the top position. Avoid collisions will avoid the bottom of the screen and avoidElement will make sure
 * that the parent element can be seen.
 * Avoid collision: We need to detect if the bottom of the element will overflow the screen. If it does then move
 * the element to the top. If avoid collision is true, we assume avoidElement is true as well.
 */
export const topPosWithinView = (
  parentSize,
  childSize,
  avoidCollisions: boolean,
  avoidElement: boolean,
  offsetTop: number | undefined,
) => {
  if (avoidCollisions && parentSize.y + parentSize.height + childSize.height > window.innerHeight) {
    return parentSize.y - childSize.height;
  }
  if (avoidElement) return parentSize.y + parentSize.height + (offsetTop || 0);

  return parentSize.y + (offsetTop || 0);
};
