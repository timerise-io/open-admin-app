import BaseInput from "components/StyledInput";
import styled from "styled-components";
import { Typography } from "./Typography";
import { Row } from "./layout/Row";

interface MinMaxProps {
  min: number;
  max: number;
  minName: string;
  maxName: string;
  disabled?: boolean;
  onChange: (value: number, key: string) => void;
}

const StyledInput = styled(BaseInput)`
  width: 36px;
`;

export const MinMax: React.FC<MinMaxProps> = ({ min, max, minName, maxName, disabled, onChange }) => {
  return (
    <Row jc="left" gap="8px" ml={4.3} mb={1}>
      <Typography as="span" typographyType="label">
        Min
      </Typography>
      <StyledInput
        value={min}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value), minName)}
        style={{ marginRight: "12px" }}
      />
      {/* <input type="text" value={min} disabled={disabled} onChange={(e) => onChange(Number(e.target.value), minName)}/> */}
      <Typography as="span" typographyType="label">
        Max
      </Typography>
      <StyledInput value={max} disabled={disabled} onChange={(e) => onChange(Number(e.target.value), maxName)} />
      {/* <input type="text" value={max} disabled={disabled} onChange={(e) => onChange(Number(e.target.value), maxName)} /> */}
    </Row>
  );
};
