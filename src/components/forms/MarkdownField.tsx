import React from "react";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";
import { TypographyType } from "models/theme";
import { useTranslation } from "react-i18next";
import MDEditor, { commands } from "@uiw/react-md-editor/nohighlight";

interface MarkdownFieldProps {
  label?: string;
  name: string;
  hideLabel?: boolean;
  hideErrors?: boolean;
  ctx?: string;
  version?: TypographyType;
}

const MarkdownField: React.FC<MarkdownFieldProps> = ({
  label,
  name,
  hideLabel = false,
  hideErrors = false,
  ctx = "",
  version = "label",
}) => {
  const { t } = useTranslation();
  const labelToDisplay = label === undefined ? t(`forms.${name}Field`) : label;

  const [, meta, helpers] = useField({ name });
  const { setValue, setTouched } = helpers;
  const [localValue, setLocalValue] = React.useState<string | undefined>(meta.value);

  React.useEffect(() => {
    if (localValue) {
      setValue(localValue);
      setTouched(true);
    }
  }, [localValue, setTouched, setValue]);

  return (
    <Column ai="stretch" w="100%">
      {hideLabel === false && (
        <StyledLabel htmlFor={name} version={version} data-ctx={ctx}>
          {labelToDisplay}
        </StyledLabel>
      )}
      <div data-color-mode="light">
        <MDEditor
          id={name}
          value={localValue}
          onChange={setLocalValue}
          preview="live"
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.divider,
            commands.link,
            commands.quote,
            commands.divider,
            commands.orderedListCommand,
            commands.unorderedListCommand,
          ]}
          extraCommands={[commands.fullscreen]}
          visibleDragbar={false}
          minHeight={192}
        />
      </div>
      <Box mt={1}>
        <Typography typographyType="label" as="span">
          {t("services.markdown-info")}{" "}
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#333333" }}
          >
            {t("services.markdown-here")}
          </a>
          .
        </Typography>
      </Box>
      {!hideErrors && (
        <Box h="13px" mt={0.5} mb={1}>
          {meta.error && meta.touched && (
            <Typography typographyType="label" as="span" color="error">
              {meta.error}
            </Typography>
          )}
        </Box>
      )}
    </Column>
  );
};

export default MarkdownField;
