import { assetsFilterAtom } from "features/assets/state/assetsFilterAtom";
import { bookingsFilterAtom } from "features/bookings/state/bookingsFilterAtom";
import { locationsFilterAtom } from "features/locations/state/locationsFilterAtom";
import { Project } from "features/project/model/project";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { servicesFilterAtom } from "features/services/state/servicesFilterAtom";
import { useToast } from "features/toast/hooks/useToast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

export const useSwitchProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showToast = useToast();

  const [selectedProjectId, setSelectedProjectId] = useRecoilState(selectedProjectAtom);

  const resetBookingsFilters = useResetRecoilState(bookingsFilterAtom);
  const resetLocationsFilters = useResetRecoilState(locationsFilterAtom);
  const resetAssetsFilters = useResetRecoilState(assetsFilterAtom);
  const resetServicesFilters = useResetRecoilState(servicesFilterAtom);

  const switchProject = (project: Project) => {
    if (project.projectId === selectedProjectId) return;
    localStorage.setItem("selectedProjectId", project.projectId);
    resetBookingsFilters();
    resetLocationsFilters();
    resetAssetsFilters();
    resetServicesFilters();
    setSelectedProjectId(project.projectId);
    showToast({
      variant: "SUCCESS",
      type: "project-changed",
      date: new Date().getTime(),
      projectName: project.title ?? "",
    });

    const needRedirect = location.pathname.search(/[//]\w+[//].+/s) > -1 ? true : false;
    if (needRedirect) {
      const targetRoute = location.pathname.split("/").find((s) => s !== "");
      navigate(targetRoute !== "settings" ? `/${targetRoute}` : "/");
    }
  };

  return { switchProject, selectedProjectId };
};
