function round(num: number) {
  return Math.round(num * 1000) / 1000;
}
const findParentElement = (
  target: HTMLElement,
  callback: (element: HTMLElement) => boolean,
  checkElement = true
): HTMLElement | null => {
  if (!(target instanceof HTMLElement)) {
    return null;
  }
  let parent: HTMLElement | null = checkElement ? target : target.parentElement;
  do {
    if (!parent) {
      return null;
    }

    const matches = callback(parent);
    if (matches) {
      return parent;
    }
  } while ((parent = parent.parentElement));

  return null;
};

const findKhulnasoftParent = (target: HTMLElement) =>
  findParentElement(target, (el) => {
    const id = el.getAttribute('khulnasoft-id') || el.id;
    return Boolean(id?.indexOf('khulnasoft-') === 0);
  });

type Offset = {
  x: number;
  y: number;
};

const computeOffset = ({
  event,
  target,
}: {
  event: MouseEvent;
  target: HTMLElement;
}): Offset => {
  const targetRect = target.getBoundingClientRect();
  const xOffset = event.clientX - targetRect.left;
  const yOffset = event.clientY - targetRect.top;

  const xRatio = round(xOffset / targetRect.width);
  const yRatio = round(yOffset / targetRect.height);

  return {
    x: xRatio,
    y: yRatio,
  };
};

export const getInteractionPropertiesForEvent = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  const targetKhulnasoftElement = target && findKhulnasoftParent(target);
  const khulnasoftId =
    targetKhulnasoftElement?.getAttribute('khulnasoft-id') ||
    targetKhulnasoftElement?.id;

  return {
    targetKhulnasoftElement: khulnasoftId || undefined,
    metadata: {
      targetOffset: target ? computeOffset({ event, target }) : undefined,
      khulnasoftTargetOffset: targetKhulnasoftElement
        ? computeOffset({ event, target: targetKhulnasoftElement })
        : undefined,
      khulnasoftElementIndex:
        targetKhulnasoftElement && khulnasoftId
          ? ([] as Element[]).slice
              .call(document.getElementsByClassName(khulnasoftId))
              .indexOf(targetKhulnasoftElement)
          : undefined,
    },
  };
};
