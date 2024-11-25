import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import styled from "styled-components";

interface Props {
  title: string;
  description?: string | React.ReactNode;
  button?: {
    label: string;
    onClick: () => void;
  };
  image?: {
    src: string;
    width: string;
  };
}

const StyledTitle = styled(Typography)`
  font-size: 19px;
  margin: 0;
`;

const StyledDescription = styled(Typography)`
  text-align: center;
  margin: 12px 0 0;
  white-space: break-spaces;
`;

const StyledButton = styled(Button)`
  margin: 20px 0 0;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0 0;
`;

export const EmptyList: React.FC<Props> = ({ title, description, button, image }) => {
  const { label, onClick } = button || {};
  const { src, width } = image || {};

  return (
    <Column>
      {title && <StyledTitle typographyType="h2">{title}</StyledTitle>}
      {description && <StyledDescription typographyType="body">{description}</StyledDescription>}
      {label && onClick && (
        <StyledButton buttonType="primary" fillWidth={false} onClick={onClick}>
          {label}
        </StyledButton>
      )}
      {src && width && title && (
        <StyledImageWrapper>
          <img src={src} alt={title} width={width} />
        </StyledImageWrapper>
      )}
    </Column>
  );
};
