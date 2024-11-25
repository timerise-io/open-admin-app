import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal, {
  ActionButtonsBaseWrapper,
  ActionRow,
  BaseModalControlsWrapper,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import { Project } from "features/project/model/project";
import { IconX } from "@tabler/icons";

interface InvitationModalProps extends Pick<Project, "title" | "projectId"> {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

const InvitationModal = ({ open, onAccept, onDecline, onCancel, projectId, title }: InvitationModalProps) => {
  return (
    <BaseModal open={open} customWidth={450}>
      <BaseModalUpperContentWrapper>
        <BaseModalHeaderWrapper>
          <Typography typographyType="h3">Project invitation</Typography>
          <IconButton onClick={() => onCancel()} type="button">
            <IconX />
          </IconButton>
        </BaseModalHeaderWrapper>
        <BaseModalControlsWrapper>
          <Typography typographyType="body" as="span">
            You have been invited to project <strong>{title}</strong>.
          </Typography>
          <Typography typographyType="body" as="span">
            {" "}
            Do you want to accept this invitation?
          </Typography>
        </BaseModalControlsWrapper>
        <ActionRow>
          <ActionButtonsBaseWrapper>
            <Button
              buttonType="secondary"
              type="button"
              fillWidth={false}
              onClick={() => {
                onDecline();
              }}
            >
              Decline
            </Button>
            <Button
              buttonType="primary"
              fillWidth={false}
              type="submit"
              onClick={() => {
                onAccept();
              }}
            >
              Accept
            </Button>
          </ActionButtonsBaseWrapper>
        </ActionRow>
      </BaseModalUpperContentWrapper>
    </BaseModal>
  );
};

export default InvitationModal;
