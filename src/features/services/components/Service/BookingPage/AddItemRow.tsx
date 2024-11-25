import { ContextSelect } from "components/card/components/ContextSelect";
import { Row } from "components/layout/Row";
import { FormFieldType } from "features/services/model/formFields";
import { isSystemFormField } from "helpers/systemFormFields";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { fieldsTypesToName } from "./BookingPageFormField/BookingPageFormField";

const StyledAddItemSelect = styled(ContextSelect)`
  width: 120px;

  .disabled-text {
    font-weight: 700;
  }
`;

const Splitter = styled.div`
  width: 100%;
  height: 1px;
  background: #d9d9d9;
`;

interface AddItemRowProps {
  values: Array<FormFieldType>;
  addField: (formFieldType: FormFieldType) => void;
}

const AddItemRow = ({ values, addField }: AddItemRowProps) => {
  const { t } = useTranslation();
  const systemFieldsInUse = values.filter((item) => isSystemFormField(item));

  return (
    <Row gap="20px" mt={2.5} mb={2.5}>
      <Splitter />
      <StyledAddItemSelect
        label=""
        value={systemFieldsInUse}
        options={fieldsTypesToName}
        fixedDisplay={t("services.form-elements-add-item")}
        closeAfterChange
        onChange={(newValues) => {
          if (typeof newValues !== "string") {
            const fieldToCreate = newValues.find((item) => {
              if (!isSystemFormField(item as FormFieldType)) return true;
              const notExists = values.findIndex((a) => a === item) === -1;
              return notExists;
            });
            fieldToCreate && addField(fieldToCreate as FormFieldType);
          }
        }}
      />
    </Row>
  );
};

export default AddItemRow;
