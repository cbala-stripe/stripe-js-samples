import { Field } from "./Field";
import { Checkbox } from "./Checkbox";
import { Select } from "./Select";
import { useAppState, useSetAppState } from "./AppState";

export const useLayoutOption = () => {
  const { layout, radios, spacedAccordionItems, defaultCollapsed } =
    useAppState([
      "layout",
      "radios",
      "spacedAccordionItems",
      "defaultCollapsed",
    ]);

  if (layout === "auto") {
    return "auto";
  }

  return {
    type: layout,
    radios,
    spacedAccordionItems,
    defaultCollapsed,
  };
};

export const LayoutOptions = () => {
  const { layout, radios, spacedAccordionItems, defaultCollapsed } =
    useAppState([
      "layout",
      "radios",
      "spacedAccordionItems",
      "defaultCollapsed",
    ]);

  const setAppState = useSetAppState();

  return (
    <>
      <Field label="Layout">
        <Select
          value={layout}
          onChange={(layout) => setAppState("layout", layout)}
          options={[
            { value: "auto", label: "auto" },
            { value: "tabs", label: "tabs" },
            { value: "accordion", label: "accordion" },
          ]}
        />
      </Field>
      {layout === "accordion" && (
        <>
          <Field label="radios">
            <Checkbox
              checked={radios}
              onChange={(radios) => setAppState("radios", radios)}
            />
          </Field>
          <Field label="Spaced accordion items">
            <Checkbox
              checked={spacedAccordionItems}
              onChange={(spacedAccordionItems) =>
                setAppState("spacedAccordionItems", spacedAccordionItems)
              }
            />
          </Field>
          <Field label="Default collapsed">
            <Checkbox
              checked={defaultCollapsed}
              onChange={(defaultCollapsed) =>
                setAppState("defaultCollapsed", defaultCollapsed)
              }
            />
          </Field>
        </>
      )}
    </>
  );
};
