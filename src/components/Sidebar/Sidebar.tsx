import { useNavigate } from "react-router-dom";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import type { SidebarProps } from "./Sidebar.types";
import { useUserStore } from "@/store/useUserStore";
import {
  baseSidebar,
  profileSection,
  container,
  nickname,
  intro,
  singleButtonWrapper,
  doubleButtonWrapper,
  footerButtons,
} from "./Sidebar.styled";

const Sidebar: React.FC<SidebarProps> = ({ variant, onLogoutClick, onLoginClick }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleMyPageClick = () => navigate("/mypage");
  const handleWriteClick = () => navigate("/write");
  const handleSettingClick = () => navigate("/mypage/setting");

  return (
    <aside className={baseSidebar}>
      {variant === "guest" && (
        <div className={profileSection}>
          <Avatar size="lg" src={user?.profilePicture} />
          <p className={intro}>You can make anything by writing</p>
          <div className={singleButtonWrapper}>
            <Button label="로그인 시작하기" variant="primaryOutline" size="sm" onClick={onLoginClick} />
          </div>
        </div>
      )}

      {variant === "user" && (
        <>
          <div className={container}>
            <div onClick={handleMyPageClick} className={profileSection}>
              <Avatar size="lg" src={user?.profilePicture} />
              <p className={nickname}>{user?.nickname ?? "닉네임"}</p>
              <p className={intro}>{user?.introduction ?? "You can make anything by writing"}</p>
            </div>

            <div className={doubleButtonWrapper}>
              <Button
                label="나의 블로그"
                variant="primaryOutline"
                size="sm"
                onClick={handleMyPageClick}
                fullWidth
              />
              <Button
                label="글 쓰러 가기"
                variant="primaryOutline"
                size="sm"
                onClick={handleWriteClick}
                fullWidth
              />
            </div>
          </div>

          <div className={footerButtons}>
            <Button
              label="설정"
              variant="secondaryOutline"
              size="sm"
              onClick={handleSettingClick}
              fullWidth
            />
            <Button
              label="로그아웃"
              variant="secondaryOutline"
              size="sm"
              fullWidth
              onClick={onLogoutClick}
            />
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
