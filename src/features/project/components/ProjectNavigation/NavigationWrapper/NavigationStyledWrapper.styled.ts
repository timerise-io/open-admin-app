import { Column } from "components/layout/Column";
import styled from "styled-components";

export const NavigationStyledWrapper = styled(Column)`
  height: 100%;
  height: -webkit-fill-available;
  max-height: 100vh;
  justify-content: flex-start;
  background-color: #f6f6f6;
  position: relative;
  min-width: 44px;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  & > .projects-buttons-wrapper {
    margin: 8px 0;
    position: relative;
    min-width: 44px;
    flex: 1;
    overflow-x: visible;
    overflow-y: clip;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .projects-buttons {
      position: absolute;
    }
  }

  & > button.arrow-up {
    z-index: 1000;
    margin: 8px 0 0 0;
  }
  & > button.arrow-down {
    z-index: 1000;
    margin: 0 0 8px 0;
  }
`;
