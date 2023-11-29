import Layout from "../../components/Layout";
import ChangePassword from "../../components/Settings/ChangePassword";
import ProfileInfoSettings from "../../components/Settings/ProfileInfo";

import * as Styled from "./Settings.styled";

function SettingsPage() {
  return (
    <Layout>
      <Styled.Wrapper>
        <Styled.PageTitle>Settings</Styled.PageTitle>
        <ProfileInfoSettings />
        <ChangePassword />
      </Styled.Wrapper>
    </Layout>
  );
}

export default SettingsPage;
