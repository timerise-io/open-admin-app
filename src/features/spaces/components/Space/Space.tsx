import React, { useEffect } from "react";
import { Button } from "components/Button";
import ExtendedMenu, { ExtendedMenuButton, ExtendedMenuSplitter } from "components/dropdowns/ExtendedMenu";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useSpace } from "features/spaces/hooks/useSpace";
import { useSpaceDuplicate } from "features/spaces/hooks/useSpaceDuplicate";
import { useSpaceUpdate } from "features/spaces/hooks/useSpaceUpdate";
import { selectedSpaceAtom } from "features/spaces/state/selectedSpaceAtom";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import DeleteSpaceButton from "./DeleteSpaceButton";
import SpaceFormContent from "./SpaceFormContent";
import { PROVIDERS } from "./enums/providers";
import { PROVIDERS_WITHOUT_LINK } from "./states";

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const getValidationSchema = (t: TFunction<"common"[]>, isUrlNotRequired: string | string[]) => {
  return Yup.object({
    url: Yup.string().when("isUrlNotRequired", {
      is: () => isUrlNotRequired === "true",
      then: () => Yup.string().nullable().notRequired(),
      otherwise: Yup.string()
        .matches(
          /^((https?|ftp):\/\/)(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i,
          t("common:validation.url"),
        )
        .required(t("common:validation.required")),
    }),
  });
};

const SectionWrapperRow = styled(Row)`
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const DetailColumn = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledRow = styled(Row)`
  gap: 10px;
`;

const Space = () => {
  const { t } = useTranslation(["common"]);
  const { id } = useParams<{ id: string }>();
  useSpace(id!);

  const space = useRecoilValue(selectedSpaceAtom);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const navigate = useNavigate();
  const duplicateStatus = useRecoilValue(apiStatusAtom("SPACE_DUPLICATE"));

  const { mutation: updateSpace } = useSpaceUpdate();
  const { mutation: duplicateSpace } = useSpaceDuplicate();

  useEffect(() => {
    if (selectedProjectId && space && selectedProjectId !== space.projectId) {
      navigate(ROUTES.spaces);
    }
  }, [navigate, selectedProjectId, space]);

  if (!space)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <Wrapper>
      {duplicateStatus.isLoading && <FullPageOverlayLoader />}
      <Formik
        initialValues={{
          provider: space?.provider || t("spaces.other"),
          url: space.url,
          title: space?.title || "",
          instructions: space?.instructions || "",
        }}
        onSubmit={(formValues, { resetForm }) => {
          updateSpace({
            projectId: space.projectId,
            spaceId: space.spaceId,
            url: formValues.url,
            title: formValues.title,
            instructions: formValues.instructions,
          });
          resetForm({ values: { ...formValues } });
        }}
        validationSchema={getValidationSchema(
          t,
          PROVIDERS_WITHOUT_LINK.includes(space.provider as PROVIDERS).toString(),
        )}
      >
        {({ isValid, dirty, resetForm }) => {
          return (
            <Form>
              <PageHeader title={space.title} showBackButton>
                <StyledRow>
                  <Button
                    buttonType="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={!dirty}
                  >
                    {t("common:discard")}
                  </Button>
                  <Button buttonType="primary" disabled={!isValid || !dirty} type="submit">
                    {t("common:save")}
                  </Button>
                  <ExtendedMenu>
                    <ExtendedMenuButton
                      buttonType="secondary"
                      type="button"
                      onClick={() => {
                        duplicateSpace({
                          projectId: selectedProjectId ?? "",
                          spaceId: space.spaceId,
                        });
                      }}
                      disabled={selectedProjectId === undefined}
                    >
                      {t("common:duplicate")}
                    </ExtendedMenuButton>
                    <ExtendedMenuSplitter />
                    <DeleteSpaceButton />
                  </ExtendedMenu>
                </StyledRow>
              </PageHeader>
              <PageContent>
                <SectionWrapperRow>
                  <DetailColumn w="530px">
                    <SpaceFormContent shortId={space.shortId} systemId={space.spaceId} provider={space.provider} />
                  </DetailColumn>
                </SectionWrapperRow>
              </PageContent>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Space;
